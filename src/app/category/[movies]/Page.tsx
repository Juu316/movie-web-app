"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Movie } from "@/types/Movie";
const Page = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const 
  const params = useParams();
  console.log("Params", params);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWFiYzllYjNmZTQxNzI1NDViZDc0MzI2ZmQwMDJmOCIsIm5iZiI6MTczODAzNzc1NC42MzY5OTk4LCJzdWIiOiI2Nzk4NTlmYTM3MmNiMjBjZjgyMzg0NGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WBQLl0E0QJ4_D0cK0QpkcTuzIiyGY7jX3c7QUPBpU-s`,
          },
        }
      );
      setMovieData(res.data.results); // results contains the movie list
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="mx-auto pl-20 pt-[59px] pb-8 lg:pb-[76px] space-y-8">
        <h2 className="mt-8 text-2xl font-medium capitalize text-foreground lg:mt-[52px] lg:text-3xl">
          upcoming
        </h2>
        <div className="flex flex-wrap gap-5 lg:gap-8">
          {" "}
          {loading ? (
            <p>Loading</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            movieData.map((movie) => (
              <div
                key={movie.id}
                className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px] cursor-pointer"
                onClick={() => router.push(`/details/${movie.id}`)}>
                <Image
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  width={230}
                  height={340}
                  objectFit="cover"
                />

                <div className="p-2">
                  <div className="flex items-center gap-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#fde047"
                      stroke="#fde047"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                    <div className="font-medium">
                      <span className="text-foreground text-sm">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground text-xs">/10</span>
                    </div>
                  </div>
                  <h4 className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground">
                    {movie.title}
                  </h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
