import type { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import { getAnime } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Anime",
  description: "Popular and top rated anime series and movies.",
};

export default async function AnimePage() {
  const [popularTv, topTv, newTv, popularMovies, topMovies] = await Promise.all([
    getAnime("tv", { sort: "popular" }),
    getAnime("tv", { sort: "top_rated" }),
    getAnime("tv", { sort: "newest" }),
    getAnime("movie", { sort: "popular" }),
    getAnime("movie", { sort: "top_rated" }),
  ]);
  const rows = [
    { title: "Popular Anime Series", data: popularTv, href: "/anime/tv?sort=popular" },
    { title: "Top Rated Anime Series", data: topTv, href: "/anime/tv?sort=top_rated" },
    { title: "New Anime Series", data: newTv, href: "/anime/tv?sort=newest" },
    { title: "Popular Anime Movies", data: popularMovies, href: "/anime/movie?sort=popular" },
    { title: "Top Rated Anime Movies", data: topMovies, href: "/anime/movie?sort=top_rated" },
  ];

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px]">
      <h1 className="mb-8 text-4xl font-bold">Anime</h1>
      {rows.map((row) => (
        <MediaGrid key={row.href} title={row.title} items={row.data.results.slice(0, 10)} seeMoreHref={row.href} />
      ))}
    </main>
  );
}
