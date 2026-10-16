export type MediaType = "movie" | "tv";

/** Movie or TV item normalized to one shape so cards and grids can render both. */
export interface MediaItem {
  id: number;
  type: MediaType;
  title: string;
  date: string;
  poster: string | null;
  backdrop: string | null;
  rating: number;
  overview: string;
}

export interface Paged<T> {
  page: number;
  totalPages: number;
  results: T[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MediaDetails extends MediaItem {
  tagline: string;
  voteCount: number;
  runtime: number | null;
  genres: Genre[];
  countries: string[];
  languages: string[];
  cast: { id: number; name: string; character: string; profile: string | null }[];
  directors: string[];
  trailerKey: string | null;
  seasons: number | null;
  episodes: number | null;
  similar: MediaItem[];
}
