"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const Movies = () => {
  //   const [movieArray, setMovieArray] = useState([]);
  //   const fetchMovie = async () => {
  //     try {
  //       setIsLoading(true);
  //       await fetch(
  //         `${TMDB_BASE_URL}/discover/movie?api_key=6eabc9eb3fe4172545bd74326fd002f8`
  //       )
  //         .then((res) => res.json())
  //         .then((json) => {
  //           setShows(json);
  //           console.log("Shows:", json);
  //         });
  //       setIsLoading(false);
  //     } catch (err) {
  //       setIsLoading(false);
  //       console.log(err);
  //     }
  //   };

  return (
    // <div className="space-y-8">
    //   <div className="flex items-center justify-between">
    //     <h3 className="text-foreground text-2xl font-semibold">Upcoming</h3>
    //     <Link
    //       className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
    //       href="/upcoming">
    //       &quot;See more&quot; <ArrowRight />
    //     </Link>
    //   </div>
    //   <div className="flex flex-wrap gap-5 lg:gap-8">
    //     <Card className="group w-[157.5px] overflow-hidden rounded-lg bg-secondary space-y-1 lg:w-[230px]">
    //       <CardHeader>
    //         <CardTitle>Card Title</CardTitle>
    //         <CardDescription>Card Description</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <p>Card Content</p>
    //       </CardContent>
    //       <CardFooter>
    //         <p>Card Footer</p>
    //       </CardFooter>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default Movies;
