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
        console.log("Credits:", res.data.crew, res.data.cast);
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

  return (
    <>
      <div className="  bg-gray-900 text-white mt-[59px] px-6 py-10 ">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-2xl shadow-lg"
            />
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
              <div className="mt-2">
                <p className="text-sm text-gray-400 mt-1">
                  TMDB Rating: {movie.vote_average.toFixed(1)}
                </p>
              </div>
            )}

            <div className="mt-6">
              {trailerLink ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition">
                  ▶ Watch Trailer
                </a>
              ) : (
                <p className="text-gray-400">No trailer available</p>
              )}
            </div>
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
