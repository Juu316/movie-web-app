/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Movie, Trailer } from "@/types/Movie";

const Page = () => {
  const token = process.env.TMDB_API_TOKEN;
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState<Movie | null>(null);

  const [trailer, setTrailer] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovie = async () => {
      try {
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrailer();
    fetchMovie();
  }, [movieId, token]);

  if (!movie) return <div className="text-center mt-20">Loading...</div>;

  const trailerLink = trailer.find(
    (vid: Trailer) => vid.site === "YouTube" && vid.type === "Trailer"
  );
  console.log(movie);
  return (
    <div className="  bg-gray-900 text-white mt-[59px] px-6 py-10 ">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Poster */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {movie.overview}
          </p>

          <div className="text-sm text-gray-400">
            <p>
              <span className="font-semibold text-white">
                Release Date:
              </span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="font-semibold text-white">
                Runtime:
              </span>{" "}
              {movie.runtime} min
            </p>
            <p>
              <span className="font-semibold text-white">
                Genres:
              </span>{" "}
              {movie.genres?.map((g: any) => g.name).join(", ")}
            </p>
          </div>

          {movie.vote_average !== undefined && (
            <div className="mt-2">
              <p className="text-sm text-gray-400 mt-1">
                TMDB Rating: {movie.vote_average.toFixed(1)} / 10
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
              <p className="text-gray-400">
                No trailer available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
