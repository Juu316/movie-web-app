"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const Slider = () => {
  //const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const [isLoading, setIsLoading] = useState(false);
  const [shows, setShows] = useState([]);

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `${TMDB_BASE_URL}/discover/movie?api_key=6eabc9eb3fe4172545bd74326fd002f8`
      )
        .then((res) => res.json())
        .then((json) => {
          setShows(json);
          console.log("Shows:", json);
        });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  );
  

  return (
    <>
      <div className="relative mt-[59px] lg:mt-[83px] w-screen ">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          // onMouseEnter={plugin.current.stop}
          // onMouseLeave={plugin.current.reset}
          >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* <div className="overflow-hidden">
          <div className="flex -ml-4"></div>
        </div> */}
      </div>
    </>
  );
};

export default Slider;
