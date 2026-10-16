# Magixx

Browse movies, TV series and anime with data from [TMDB](https://www.themoviedb.org). Shows information only, not the movies themselves.

## Features

- Home: now playing slider, upcoming, popular, top rated, popular anime
- Movie categories and multi-genre filter, with pagination
- Search across movies and TV, with live suggestions
- Details pages for movies (`/details/movie/:id`) and series (`/details/tv/:id`): cast, trailer, similar titles
- Anime section (`/anime`, `/anime/tv`, `/anime/movie`) sorted by popular, top rated or newest
- Light and dark theme

## Setup

1. Get a TMDB "API Read Access Token" from https://www.themoviedb.org/settings/api.
2. Create `.env.local`:

   ```
   TMDB_API_TOKEN=your_read_access_token
   # Optional, used for absolute Open Graph URLs
   SITE_URL=https://your-domain.example
   ```

3. Run:

   ```
   npm install
   npm run dev
   ```

The token is read only on the server (`src/lib/tmdb.ts`). The browser never calls TMDB directly; live search goes through `/api/search`. `npm run build` needs a valid token, because the home and anime pages are prerendered.

## How anime is fetched

TMDB has no "anime" type. The app uses TMDB's discover endpoint with the Animation genre (id `16`) and Japanese original language:

```
GET /discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc
GET /discover/movie?with_genres=16&with_original_language=ja&sort_by=popularity.desc
```

See `getAnime()` in `src/lib/tmdb.ts`.
