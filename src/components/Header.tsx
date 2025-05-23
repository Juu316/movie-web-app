"use client";
import React, { useState, useEffect, useRef } from "react";
import { Film, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/Movie";
import Image from "next/image";
const Header = () => {
  const { push } = useRouter();
  const token = process.env.TMDB_API_TOKEN;
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const genreRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions as user types
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: { query: value, language: "en-US", page: 1 },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuggestions(res.data.results.slice(0, 6)); // Show top 6
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // debounce
  };

  // Hide suggestions on click outside
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const applyGenreSelection = () => {
    if (selectedGenres.length) {
      push(`/genre/${selectedGenres.join(",")}`);
      setShowGenres(false);
    }
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      push(`/search?query=${encodeURIComponent(search)}`);
    }
  };
  return (
    <header className="fixed top-0 inset-x-0 z-20 h-[59px] flex items-center justify-center bg-background">
      <div className="flex items-center justify-between w-full px-5">
        <Link className="flex items-center gap-x-2 text-indigo-700" href="/">
          <Film width={20} height={20} />
          <h4 className="italic font-bold">Magixx</h4>
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
                  {genres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                      <Button
                        key={genre.id}
                        variant={isSelected ? "secondary" : "ghost"}
                        className="w-full justify-start hover:bg-secondary transition-colors"
                        onClick={() => toggleGenre(genre.id)}>
                        {genre.name}
                      </Button>
                    );
                  })}
                </div>
                {/* Apply button to trigger search with selected genres */}
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={applyGenreSelection}
                    disabled={selectedGenres.length === 0}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative hidden sm:block text-muted-foreground w-[379px]"
            ref={searchRef}>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width={16}
              height={16}
            />
            <form onSubmit={handleSearchSubmit}>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
                placeholder="Search..."
                value={search}
                onChange={handleSearch}
                onFocus={() => search && setShowSuggestions(true)}
              />
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-gray-600 shadow-lg rounded z-50  overflow-y-auto">
                {suggestions.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-500 cursor-pointer"
                    onClick={() => {
                      setShowSuggestions(false);
                      push(`/details/${movie.id}`);
                    }}>
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          : "/placeholder.jpg"
                      }
                      alt={movie.title}
                      width={40}
                      height={56}
                      className="w-10 h-14 object-cover rounded"
                      unoptimized={movie.poster_path ? false : true}
                    />
                    <div>
                      <div className="font-medium text-gray-100">
                        {movie.title}
                      </div>
                      <div className="text-xs text-gray-300">
                        {movie.release_date
                          ? movie.release_date.slice(0, 4)
                          : ""}
                        {movie.media_type === "tv" && " • TV"}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="px-4 py-2 text-center text-green-600 font-semibold cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setShowSuggestions(false);
                    push(`/search?query=${encodeURIComponent(search)}`);
                  }}>
                  View all results
                </div>
              </div>
            )}
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
