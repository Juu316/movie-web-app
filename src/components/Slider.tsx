"use client";
import React, { useEffect, useState } from "react";

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
          console.log(json);
          setShows(json);
        });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      <div className="relative mt-[59px] lg:mt-[83px] w-screen overflow-hidden">
        <div className="overflow-hidden">
          <div className="flex -ml-4"></div>
        </div>
      </div>
    </>
  );
};

export default Slider;
