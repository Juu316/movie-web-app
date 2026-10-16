export const NO_POSTER = "/no-poster.svg";

export type PosterSize = "w92" | "w185" | "w342" | "w500" | "w780";
export type BackdropSize = "w780" | "w1280" | "original";

export function tmdbImage(
  path: string | null | undefined,
  size: PosterSize | BackdropSize
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : NO_POSTER;
}
