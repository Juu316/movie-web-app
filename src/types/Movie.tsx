export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  adult: boolean;
  video: boolean;
  runtime: number;
  genres: Genre[];
  spoken_languages: Languages[];
  production_countries: Countries[];
  media_type: string;
}
export type Countries = {
  name: string;
  iso_3166_1: string;
};
export type Languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
export type Trailer = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}
