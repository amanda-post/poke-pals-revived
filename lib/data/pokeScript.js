const { default: axios } = require('axios');
const fs = require('fs');

const formatName = (name) => {
  return name
    .split('-')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const habitats = [
  {
    name: 'cave',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/1/',
  },
  {
    name: 'forest',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/2/',
  },
  {
    name: 'grassland',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/',
  },
  {
    name: 'mountain',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/4/',
  },
  {
    name: 'rare',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/5/',
  },
  {
    name: 'rough-terrain',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/6/',
  },
  {
    name: 'sea',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/7/',
  },
  {
    name: 'urban',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/8/',
  },
  {
    name: 'waters-edge',
    url: 'https://pokeapi.co/api/v2/pokemon-habitat/9/',
  },
];

const formatHabitats = () => {
  return habitats.reduce(async (acc, habitat) => {
    const accumulator = await acc;
    const { data: habitatData } = await axios.get(habitat.url);
    accumulator[habitat.name] = {
      speciesFoundInHabitat: habitatData.pokemon_species.map((species) =>
        formatName(species.name)
      ),
    };
    return accumulator;
  }, {});
};

const formatStats = (stats) => {
  return stats.reduce((acc, stat) => {
    acc[stat.stat.name.replace('-', '_')] = stat.base_stat;
    return acc;
  }, {});
};

const formatMovesByLearnMethod = async (moves) => {
  return moves.reduce(
    async (acc, move) => {
      const accumulator = await acc;
      const {
        version_group_details,
        move: { name },
      } = move;
      const {
        level_learned_at,
        move_learn_method: { name: learnMethod },
      } = version_group_details[0];
      const shouldBeArray =
        learnMethod === 'machine' ||
        learnMethod === 'tutor' ||
        learnMethod === 'egg';

      if (shouldBeArray) {
        accumulator[learnMethod].push({
          name: formatName(name),
          id: getPokeAPIId(move.move.url, 'https://pokeapi.co/api/v2/move/'),
        });
      } else {
        accumulator['levelUp'][level_learned_at] = {
          name: formatName(name),
          id: getPokeAPIId(move.move.url, 'https://pokeapi.co/api/v2/move/'),
        };
      }
      return accumulator;
    },
    { machine: [], tutor: [], egg: [], levelUp: {} }
  );
};

const getPokeAPIId = (str, sub) => {
  const subIndex = str.indexOf(sub);
  return (
    str.slice(0, subIndex) + str.slice(subIndex + sub.length).replace('/', '')
  );
};

const formatTypes = (types) => {
  return types.reduce((acc, type) => {
    const {
      type: { name },
    } = type;
    acc.push(formatName(name));
    return acc;
  }, []);
};

const getMediumGrowthRate = () => {
  return axios
    .get('https://pokeapi.co/api/v2/growth-rate/2')
    .then(({ data }) => {
      return data.levels.reduce((acc, level) => {
        acc[level.level] = level.experience;
        return acc;
      }, {});
    });
};

const generateIdArray = (start, end) => {
  const idArray = [];
  for (let i = start; i <= end; i++) {
    idArray.push(i);
  }
  return idArray;
};

const fetchAndMassagePokemonData = (pokemonIds) => {
  const allFormattedPokemon = pokemonIds.reduce(async (acc, pokeId) => {
    const accumulator = await acc;
    let pokemon = {};

    const { data: baseData } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    );
    const { id, height, weight, name, base_experience, sprites } = baseData;
    const { back_default, back_shiny, front_default, front_shiny } = sprites;
    pokemon.id = id;
    pokemon.height = height;
    pokemon.weight = weight;
    pokemon.name = formatName(name);
    pokemon.base_experience = base_experience;
    pokemon.sprites = { back_default, back_shiny, front_default, front_shiny };
    pokemon.stats = formatStats(baseData.stats);
    pokemon.moves = await formatMovesByLearnMethod(baseData.moves);
    pokemon.types = formatTypes(baseData.types);

    const { data: speciesData } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`
    );

    const {
      evolution_chain,
      flavor_text_entries,
      gender_rate,
      capture_rate,
      base_happiness,
      growth_rate,
      habitat,
      hatch_counter,
      is_mythical,
      is_legendary,
      generation,
    } = speciesData;
    pokemon.gender_rate = gender_rate;
    pokemon.capture_rate = capture_rate;
    pokemon.base_happiness = base_happiness;
    pokemon.growth_rate = growth_rate.name;
    pokemon.habitat = formatName(habitat.name);
    pokemon.hatch_counter = hatch_counter;
    pokemon.is_mythical = is_mythical;
    pokemon.is_legendary = is_legendary;
    pokemon.generation = generation.url.slice(-2, -1);
    pokemon.flavor_text = flavor_text_entries
      .find((entry) => {
        return entry.language.name === 'en';
      })
      .flavor_text.replace(/[\n\f]/g, ' ')
      .replace('POKéMON', 'Pokémon');

    const { data: evolutionData } = await axios.get(evolution_chain.url);
    const { chain } = evolutionData;
    const evolutions = chain.evolves_to.map((evolvesTo) => {
      const evolution = {};
      evolution.name = formatName(evolvesTo.species.name);
      evolution.id = getPokeAPIId(
        evolvesTo.species.url,
        'https://pokeapi.co/api/v2/pokemon-species/'
      );
      evolution.trigger = evolvesTo.evolution_details[0].trigger.name;
      evolution.min_level = evolvesTo.evolution_details[0].min_level;
      evolution.item = evolvesTo.evolution_details[0].item;
      return evolution;
    });
    pokemon.evolutions = evolutions;
    accumulator[pokeId] = pokemon;
    console.log(pokemon.name);
    return accumulator;
  }, {});

  return allFormattedPokemon;
};

(async () => {
  const ids = generateIdArray(1, 386);
  try {
    const pokemon = await fetchAndMassagePokemonData(ids);
    fs.writeFile(
      'pokedex.ts',
      `const pokedex = ${JSON.stringify(pokemon)};`,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Success!');
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
})();
