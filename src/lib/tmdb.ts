import "server-only";
import type {
  Genre,
  MediaDetails,
  MediaItem,
  MediaType,
  Paged,
} from "@/types/media";

const BASE_URL = "https://api.themoviedb.org/3";
/** TMDB rejects page numbers above 500, even when total_pages is higher. */
export const MAX_PAGE = 500;

/** TMDB has no "anime" type: anime = Animation genre + Japanese original language. */
export const ANIME_GENRE = 16;
export const ANIME_LANGUAGE = "ja";

export const MOVIE_CATEGORIES = {
  now_playing: "Now Playing",
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
} as const;
export type MovieCategory = keyof typeof MOVIE_CATEGORIES;

export const ANIME_SORTS = {
  popular: "Popular",
  top_rated: "Top Rated",
  newest: "Newest",
} as const;
export type AnimeSort = keyof typeof ANIME_SORTS;

type Params = Record<string, string | number | undefined>;

export class TmdbError extends Error {
  constructor(public status: number, path: string) {
    super(`TMDB request failed (${status}) for ${path}`);
  }
}

export async function tmdb<T>(
  path: string,
  params: Params = {},
  revalidate = 3600
): Promise<T> {
  const token = process.env.TMDB_API_TOKEN;
  if (!token) throw new Error("TMDB_API_TOKEN is not set");

  const url = new URL(BASE_URL + path);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    next: { revalidate },
  });
  if (!res.ok) throw new TmdbError(res.status, path);
  return res.json();
}

// Raw TMDB shapes (only the fields we use)
interface RawItem {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
}

interface RawPage {
  page: number;
  total_pages: number;
  results: RawItem[];
}

export function normalize(raw: RawItem, fallbackType: MediaType): MediaItem {
  const type = raw.media_type === "tv" || raw.media_type === "movie" ? raw.media_type : fallbackType;
  return {
    id: raw.id,
    type,
    title: raw.title ?? raw.name ?? "Untitled",
    date: raw.release_date ?? raw.first_air_date ?? "",
    poster: raw.poster_path,
    backdrop: raw.backdrop_path,
    rating: raw.vote_average ?? 0,
    overview: raw.overview ?? "",
  };
}

function toPaged(res: RawPage, type: MediaType): Paged<MediaItem> {
  return {
    page: res.page,
    totalPages: Math.max(1, Math.min(res.total_pages, MAX_PAGE)),
    results: res.results.map((r) => normalize(r, type)),
  };
}

/** Parse a `?page=` value and clamp it into TMDB's allowed range. */
export function parsePage(value: string | string[] | undefined) {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(n) ? Math.min(Math.max(n, 1), MAX_PAGE) : 1;
}

export async function getMovieList(category: MovieCategory, page = 1) {
  return toPaged(await tmdb<RawPage>(`/movie/${category}`, { page }), "movie");
}

export async function discover(type: MediaType, params: Params, page = 1) {
  return toPaged(await tmdb<RawPage>(`/discover/${type}`, { ...params, page }), type);
}

export async function searchMulti(query: string, page = 1) {
  const res = await tmdb<RawPage>("/search/multi", { query, page, include_adult: "false" }, 600);
  return {
    ...toPaged(res, "movie"),
    // /search/multi also returns people; keep only titles.
    results: res.results
      .filter((r) => r.media_type === "movie" || r.media_type === "tv")
      .map((r) => normalize(r, "movie")),
  };
}

export async function getGenres(type: MediaType = "movie") {
  const res = await tmdb<{ genres: Genre[] }>(`/genre/${type}/list`, {}, 86400);
  return res.genres;
}

export async function getAnime(
  type: MediaType,
  { sort = "popular", page = 1 }: { sort?: AnimeSort; page?: number } = {}
) {
  const today = new Date().toISOString().slice(0, 10);
  const dateField = type === "tv" ? "first_air_date" : "primary_release_date";
  const sortParams: Record<AnimeSort, Params> = {
    popular: { sort_by: "popularity.desc" },
    // Without a vote floor, titles with one 10/10 vote dominate.
    top_rated: { sort_by: "vote_average.desc", "vote_count.gte": 200 },
    newest: { sort_by: `${dateField}.desc`, [`${dateField}.lte`]: today },
  };
  return discover(
    type,
    {
      with_genres: ANIME_GENRE,
      with_original_language: ANIME_LANGUAGE,
      ...sortParams[sort],
    },
    page
  );
}

interface RawDetails extends RawItem {
  tagline?: string;
  vote_count: number;
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  genres: Genre[];
  production_countries?: { name: string }[];
  spoken_languages?: { english_name: string }[];
  created_by?: { name: string }[];
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { job: string; name: string }[];
  };
  videos: { results: { key: string; site: string; type: string; official?: boolean }[] };
  similar: RawPage;
}

/** Movie or TV details, credits, videos and similar titles in one request. Returns null on 404. */
export async function getDetails(type: MediaType, id: string): Promise<MediaDetails | null> {
  if (!/^\d+$/.test(id)) return null;
  let raw: RawDetails;
  try {
    raw = await tmdb<RawDetails>(`/${type}/${id}`, {
      append_to_response: "credits,videos,similar",
    });
  } catch (error) {
    if (error instanceof TmdbError && error.status === 404) return null;
    throw error;
  }

  const youtube = raw.videos.results.filter((v) => v.site === "YouTube");
  const trailer =
    youtube.find((v) => v.type === "Trailer" && v.official) ??
    youtube.find((v) => v.type === "Trailer") ??
    youtube.find((v) => v.type === "Teaser");

  return {
    ...normalize(raw, type),
    tagline: raw.tagline ?? "",
    voteCount: raw.vote_count,
    runtime: raw.runtime ?? raw.episode_run_time?.[0] ?? null,
    genres: raw.genres,
    countries: raw.production_countries?.map((c) => c.name) ?? [],
    languages: raw.spoken_languages?.map((l) => l.english_name) ?? [],
    cast: raw.credits.cast.slice(0, 12).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile: c.profile_path,
    })),
    directors:
      type === "tv"
        ? raw.created_by?.map((c) => c.name) ?? []
        : raw.credits.crew.filter((c) => c.job === "Director").map((c) => c.name),
    trailerKey: trailer?.key ?? null,
    seasons: raw.number_of_seasons ?? null,
    episodes: raw.number_of_episodes ?? null,
    similar: raw.similar.results.slice(0, 10).map((r) => normalize(r, type)),
  };
}
