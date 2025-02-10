"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const Slider = () => {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const [isLoading, setIsLoading] = useState(false);
  const [shows, setShows] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [image, setImage] = useState();
  

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
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{}</span>

                    {/* <Image width="300" height="300" src="${data.backdrop_path"}></Image> */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselPrevious />
            <CarouselNext />
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Slider;
