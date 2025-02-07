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
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
  };
  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .then((json) => {
          setNowPlaying(json.results);
          console.log("Now playing:", json);
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const fetchImage = async () => {
    try {
      await fetch("https://image.tmdb.org/t/p", options)
        .then((res) => res.json())
        .then((json) => {
          console.log("Image", json);
        });
    } catch {}
  };
  useEffect(() => {
    fetchMovie();
    fetchImage();
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
            ><CarouselContent>
        {nowPlaying.map((data, index) => {
          return (
            
            
              
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                        {data.id}
                        {/* <Image width="300" height="300" src="${data.backdrop_path"}></Image> */}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              
              
              
          );
        })}
        <CarouselPrevious />
        <CarouselNext />
        </CarouselContent>
        </Carousel>
      </div>

      <div className="min-h-screen max-w-screen-xl ml-auto mr-auto py-8 lg:py-13 space-y-8 lg:space-y-13">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-foreground text-2xl font-semibold">Upcoming</h3>
            <Link
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
              href="/upcoming">
              &quot;See more&quot; <ArrowRight />
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 lg:gap-8">
            <Card className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      {/* <div className="overflow-hidden">
          <div className="flex -ml-4"></div>
        </div> */}
    </>
  );
};

export default Slider;
