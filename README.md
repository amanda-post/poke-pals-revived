## Deployed with Vercel at:

[https://poke-pals-revived.vercel.app/](https://poke-pals-revived.vercel.app/)

## Roadmap

- [x] Initialize App
- [x] Fetch and massage data from Poke API for cached use
- [x] Create logo & convert to .tsx
- [x] Login page UI
- [x] Set up real log in capabilities using Next Auth for GitHub
- [x] Set up top nav bar and routing for all authenticated domains
- [x] Log in and log out capability
- [x] Creation screen for user to create a playerAlias
- [x] Wire up creation form and check DB for playerAlias availability
- [x] Add friend UI
- [x] Wire up ability to send friend request
- [ ] Fetch & display pending friend requests
- [ ] Send message UI
- [ ] Wire up send message, only allow sending to friends
- [ ] Messages table, grouped by friend

POKEMON FUNCTIONALITY

- [ ] Party & storage schema
- [ ] Add capability to add a Pokemon to party or storage (if party full)
- [ ] Go exploring UI
- [ ] MVP: Add "search for pokemon button" with random timeout and pokemon generation based on what location
- [ ] Throw pokeball UI
- [ ] Randomize chance of capture

## Running locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
