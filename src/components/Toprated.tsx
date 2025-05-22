import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Rating from "./ui/Rating";
import { Movie } from "@/types/Movie";
const Toprated = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.TMDB_API_TOKEN;
  const { push } = useRouter();
  const fetchTopRated = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovieData(res.data.results.slice(0, 10)); // results contains the movie list
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Fetch error");
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  useEffect(() => {
    console.log("Top rated:", movieData); // Logs updated state
  }, [movieData]);

  return (
    <div className="space-y-8 mb-5">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-2xl font-semibold">Top Rated</h3>
        <div
          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
          onClick={() => {
            push(`/category/toprated`);
          }}>
          &quot;See more&quot; <ArrowRight />
        </div>
      </div>
      <div className="flex flex-wrap gap-5 lg:gap-8">
        {loading ? (
          <p>Loading</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          movieData.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]"
              onClick={() => push(`/details/${movie.id}`)}>
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width={230}
                height={340}
                objectFit="cover"
              />

              <div className="p-2">
                <Rating movie={{ vote_average: movie.vote_average }} />
                <h4 className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                  {movie.title}
                </h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Toprated;
