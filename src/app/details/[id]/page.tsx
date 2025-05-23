"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Movie, Trailer } from "@/types/Movie";
import MovieList from "@/components/ui/movieList";
//Skeletonoo ShadCN eer hiimeergui ym bn
const MovieDetailsSkeleton = () => (
  <div className="animate-pulse bg-gray-900 text-white mt-[59px] px-6 py-10">
    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10">
      <div className="flex-shrink-0 mx-auto lg:mx-0 w-[300px] h-[450px] bg-gray-800 rounded-2xl shadow-lg" />
      <div className="flex-1 space-y-4">
        <div className="h-8 bg-gray-800 rounded w-3/4" />
        <div className="h-6 bg-gray-800 rounded w-1/2" />
        <div className="h-4 bg-gray-800 rounded w-1/4" />
        <div className="h-4 bg-gray-800 rounded w-1/4" />
        <div className="h-4 bg-gray-800 rounded w-1/4" />
        <div className="h-6 bg-gray-800 rounded w-1/3 mt-6" />
      </div>
    </div>
  </div>
);
const Page = () => {
  const token = process.env.TMDB_API_TOKEN;
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovie, setSimilarMovie] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState<{ name: string }[]>([]);
  const [crew, setCrew] = useState<{ job: string; name: string }[]>([]);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCast(res.data.cast);
        setCrew(res.data.crew);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const trailerr = res.data.results.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (vid: any) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        if (trailerr) setVideoKey(trailerr.key);
        setTrailer(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovie(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSimilar = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSimilarMovie(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCredits();
    fetchSimilar();
    fetchTrailer();
    fetchMovie();
  }, [movieId, token]);
  // Manii skeleton hhe
  if (loading || !movie) return <MovieDetailsSkeleton />;

  const trailerLink = trailer.find(
    (vid: Trailer) => vid.site === "YouTube" && vid.type === "Trailer"
  );
  if (!videoKey) return <p>Loading trailer...</p>;
  return (
    <>
      <div className="  bg-gray-900 text-white mt-[59px] px-6 py-10 ">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0 mx-auto lg:mx-0 flex flex-col items-center">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-2xl shadow-lg"
            />
            <div className="mt-6">
              {trailerLink ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition">
                  ▶ Watch Trailer On Youtube
                </a>
              ) : (
                <p className="text-gray-400">No trailer available</p>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.overview}
            </p>

            <div className="text-sm text-gray-400 flex gap-4">
              <div>
                <p>
                  <span className="font-semibold text-white">
                    Release Date:{" "}
                  </span>
                  {movie.release_date}
                </p>
                <p>
                  <span className="font-semibold text-white">Country: </span>
                  {movie.production_countries
                    ?.map((country: { name: string }) => country.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-white">Language: </span>
                  {movie.spoken_languages
                    ?.map((lang: { english_name: string }) => lang.english_name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-white">Runtime: </span>
                  {movie.runtime} min
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold text-white">Genres: </span>
                  {movie.genres
                    ?.map((g: { id: number; name: string }) => g.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-white">Actors: </span>
                  {cast
                    .slice(0, 3)
                    .map((actor: { name: string }) => actor.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-white">Director: </span>
                  {crew.find(
                    (member: { job: string; name: string }) =>
                      member.job === "Director"
                  )?.name || "N/A"}
                </p>
              </div>
            </div>

            {movie.vote_average !== undefined && (
              <div className="mt-2 flex items-center gap-6 text-xl">
                <div className="flex  items-center gap-1">
                  TMDB:
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#fde047"
                    stroke="#fde047"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star ">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  {movie.vote_average.toFixed(1)}
                </div>
                <div>Votes: {movie.vote_count}</div>
              </div>
            )}
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <MovieList
        title="Related movies"
        movies={similarMovie}
        loading={loading}
        errorMessage=""
        categoryRoute=""
        showSeeMore={false}
      />
    </>
  );
};

export default Page;
