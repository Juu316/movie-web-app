import Slider from "@/components/Slider";
import MediaGrid from "@/components/MediaGrid";
import { getAnime, getMovieList } from "@/lib/tmdb";

export default async function Home() {
  const [nowPlaying, upcoming, popular, topRated, anime] = await Promise.all([
    getMovieList("now_playing"),
    getMovieList("upcoming"),
    getMovieList("popular"),
    getMovieList("top_rated"),
    getAnime("tv"),
  ]);

  return (
    <>
      <Slider items={nowPlaying.results.slice(0, 10)} />
      <div className="max-w-screen-xl w-full mx-auto py-8 lg:py-12 px-4">
        <MediaGrid title="Upcoming" items={upcoming.results.slice(0, 10)} seeMoreHref="/category/upcoming" />
        <MediaGrid title="Popular" items={popular.results.slice(0, 10)} seeMoreHref="/category/popular" />
        <MediaGrid title="Top Rated" items={topRated.results.slice(0, 10)} seeMoreHref="/category/top_rated" />
        <MediaGrid title="Popular Anime" items={anime.results.slice(0, 10)} seeMoreHref="/anime" />
      </div>
    </>
  );
}
