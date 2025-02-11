"use client";
import React, { useEffect, useState } from "react";
import { EmblaPluginType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Image from "next/image";

const Slider = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWFiYzllYjNmZTQxNzI1NDViZDc0MzI2ZmQwMDJmOCIsIm5iZiI6MTczODAzNzc1NC42MzY5OTk4LCJzdWIiOiI2Nzk4NTlmYTM3MmNiMjBjZjgyMzg0NGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WBQLl0E0QJ4_D0cK0QpkcTuzIiyGY7jX3c7QUPBpU-s"; // Replace with your actual API key

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setNowPlayingMovies(response.data.results.slice(0, 10));
      console.log("Now playing:", response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    console.log("10 now playing:", nowPlayingMovies);
  }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );
  return (
    <>
      {/* <div className="relative mt-[59px] lg:mt-[83px] w-screen ">
      <div className="w-full max-w-2xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="w-full flex justify-center">
              <Image
              width={2000}
              height={200}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
      </div> */}
      <div className="relative mt-[59px] lg:mt-[83px] w-screen h-[603px]">
        <Carousel plugins={[plugin.current]} className="w-screen h-[603px]">
          <CarouselContent>
            {nowPlayingMovies.map((movie) => (
              <CarouselItem key={movie.id} className="w-full h-[603px]">
                <div  className="w-full h-[603px]">
                  <Image
                    alt={"alt"}
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    fill
                    objectFit="cover"
                    className="-z-10"
                  />
                </div>

                {movie.title}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Slider;
