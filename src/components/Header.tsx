"use client";
import React, { useState, useEffect, useRef } from "react";
import { Film, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useTheme } from "next-themes";

const Header = () => {
  const token = process.env.TMDB_API_TOKEN;
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreRef.current &&
        !genreRef.current.contains(event.target as Node)
      ) {
        setShowGenres(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGenres(res.data.genres || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-20 h-[59px] flex items-center justify-center bg-background">
      <div className="flex items-center justify-between w-full px-5">
        <Link className="flex items-center gap-x-2 text-indigo-700" href="/">
          <Film width={20} height={20} />
          <h4 className="italic font-bold">Movie magixx</h4>
        </Link>
        <div className="relative flex items-center gap-x-3">
          <div className="relative" ref={genreRef}>
            <Button
              className="h-9"
              variant="outline"
              onClick={() => setShowGenres((prev) => !prev)}>
              <ChevronDown className="mr-2" />
              Genre
            </Button>
            {showGenres && (
              <div className="absolute left-0 mt-2 w-[480px] bg-card border border-border rounded-lg shadow-lg z-30 p-4">
                <div className="grid grid-cols-3 gap-2">
                  {genres.map((genre) => (
                    <Button
                      key={genre.id}
                      variant="ghost"
                      className="w-full justify-start hover:bg-secondary transition-colors"
                      onClick={() => {
                        // Add your genre selection logic here
                        setShowGenres(false);
                      }}>
                      {genre.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative hidden sm:block text-muted-foreground w-[379px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width={16}
              height={16}
            />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="sm:hidden">
            <Button variant="outline" className="w-9 h-9">
              <Search />
            </Button>
          </div>
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
