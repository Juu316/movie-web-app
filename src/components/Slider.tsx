"use client";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Rating from "./ui/rating";
import { Movie } from "@/types/Movie";

interface ArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const Slider = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const token = process.env.TMDB_API_TOKEN;
  const { push } = useRouter();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const SliderSkeleton = () => (
    <div className="w-full h-[80vh] relative flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg overflow-hidden">
      <div className="absolute top-12 left-6 bg-gray-300 dark:bg-gray-700 z-20 rounded-lg flex gap-6 shadow-lg p-2 w-[430px] h-[140px]">
        <div className="bg-gray-400 dark:bg-gray-600 rounded-md w-[80px] h-[120px]" />
        <div className="flex flex-col gap-2 w-[330px]">
          <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2" />
          <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
  const fetchNow = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovieData(res.data.results.slice(0, 10));
      setImageLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  if (!imageLoaded) {
    return (
      <div className="navigation-wrapper mt-[59px]">
        <div className="keen-slider">
          {Array.from({ length: 1 }).map((_, idx) => (
            <div
              key={idx}
              className="keen-slider__slide flex justify-center bg-inherit">
              <SliderSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="navigation-wrapper mt-[59px] ">
        <div className="relative h-[80vh] w-full bg-black text-white">
          <div className="absolute bottom-10 left-12 z-10 text-[3rem] font-bold hidden sm:block">
            Welcome to Magixx!
            <br></br>
            <span className="text-[2rem]">
              Browse comprehensive movie information instantly.
            </span>
          </div>
          <div ref={sliderRef} className="keen-slider">
            {movieData &&
              movieData.map((movie: Movie) => (
                <div
                  key={movie.id}
                  className="keen-slider__slide flex justify-center bg-inherit">
                  <div className="relative w-full h-[80vh]">
                    <Image
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      fill
                      className="object-cover opacity-75 z-10"
                      priority
                    />

                    <div className="absolute top-12 left-6 bg-gray-800  z-20 rounded-lg flex gap-6  shadow-lg p-2">
                      <div>
                        <Image
                          alt={movie.title}
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          className="object-cover rounded-md cursor-pointer"
                          width={80}
                          height={120}
                          onClick={() => push(`/details/${movie.id}`)}
                        />
                      </div>
                      <div className="w-[330px]">
                        <div
                          onClick={() => push(`/details/${movie.id}`)}
                          className="font-semibold text-[1.5rem] cursor-pointer">
                          {movie.title}
                        </div>
                        <div className="flex gap-4">
                          <Rating
                            movie={{ vote_average: movie.vote_average }}
                          />
                          <div> {movie.release_date} </div>
                        </div>

                        <div className=" box-border break-words overflow-hidden text-xs line-clamp-3">
                          {movie.overview}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  "dot" + (currentSlide === idx ? " active" : "")
                }></button>
            );
          })}
        </div>
      )}
    </>
  );
};
function Arrow({ disabled, left, onClick }: ArrowProps) {
  const disabledClass = disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={onClick}
      className={`arrow ${
        left ? "arrow--left" : "arrow--right"
      } ${disabledClass}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      {left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}
export default Slider;
