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
  }

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
  
  // Interface for movie credits
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