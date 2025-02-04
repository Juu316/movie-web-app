"use client";
import React, { useState, useEffect } from "react";
import { Film, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTheme } from "next-themes";
const Header = () => {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  
  // const handleChange = (event) => {
  //   setSearch(event.target.value);
  // };


  // const response = axios.get(
  //   `${TMDB_BASE_URL}/search/movie?query=${moviesSearch}&api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${TMDB_API_TOKEN}`,
  //     },
  //   }
  // );
  return (
    <header className="fixed top-0 inset-x-0 z-20 h-[59px] flex items-center justify-center bg-background">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <Link className="flex items-center gap-x-2 text-indigo-700" href="/">
          <Film width={20} height={20} />
          <h4 className="italic font-bold">Movie Z</h4>
        </Link>
        <div className="relative hidden lg:flex items-center gap-x-3">
          <Button className="h-9 " variant="outline">
            <ChevronDown />
            Genre
          </Button>

          <div className="relative text-muted-foreground w-[379px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width={16}
              height={16}
            />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
              placeholder="Search..."
            ></input>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="lg:hidden">
            <Button variant="outline"
              className="w-9 h-9">
              <Search /></Button> </div>

          {theme === "dark" ? (
            <Button
              variant="outline"
              className="w-9 h-9"
              onClick={() => {
                setTheme("light");
              }}>
              <Sun />
            </Button>
          ) : (
            <Button
              variant="outline"
              className="h-9 w-9"
              onClick={() => {
                setTheme("dark");
              }}>
              <Moon />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
