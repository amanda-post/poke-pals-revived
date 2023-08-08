const { PrismaClient } = require("@prisma/client");
const data = require("./pokeData.json"); // Or wherever your data resides

const prisma = new PrismaClient();

async function main() {
  for (const pokemon of data) {
    const existingPokemon = await prisma.pokemon.findUnique({
      where: { name: pokemon.name },
    });

    if (!existingPokemon) {
      await prisma.pokemon.create({
        data: {
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          xp: pokemon.xp,
          image_url: pokemon.image_url,
          pokemon_url: pokemon.pokemon_url,
          abilities: {
            create: pokemon.abilities,
          },
          stats: {
            create: pokemon.stats,
          },
          types: {
            connectOrCreate: pokemon.types.map((type: any) => ({
              where: { name: type.name },
              create: { name: type.name },
            })),
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
