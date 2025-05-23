import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/types/Movie";
import MovieList from "./ui/movieList";

const Toprated = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.TMDB_API_TOKEN;

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
      setMovieData(res.data.results.slice(0, 10));
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching top-rated movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <MovieList
      title="Top Rated"
      movies={movieData}
      loading={loading}
      errorMessage={errorMessage}
      categoryRoute="/category/top_rated"
    />
  );
};

export default Toprated;
