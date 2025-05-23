"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "@/components/ui/movieList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Movie } from "@/types/Movie";
const SearchMovies = () => {
  const token = process.env.TMDB_API_TOKEN;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("query") || "";

  const fetchMovies = async (query: string, page: number) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          query: query,
          language: "en-US",
          page: page,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchMovies(urlQuery, newPage);
    }
  };

  const getPaginationRange = () => {
    const pages: number[] = [];
    pages.push(1);
    if (page - 1 > 1) {
      pages.push(page - 1);
    }
    if (page !== 1) {
      pages.push(page);
    }
    if (page + 1 <= totalPages) {
      pages.push(page + 1);
    }
    return Array.from(new Set(pages)).sort((a, b) => a - b);
  };

  const paginationRange = getPaginationRange();
  useEffect(() => {
    if (urlQuery) {
      fetchMovies(urlQuery, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery]);
  return (
    <div className="mt-[59px] p-4">
      <MovieList
        title={`Search results for: ${urlQuery}`}
        movies={movies}
        loading={loading}
        errorMessage={errorMessage}
        categoryRoute="/search"
        showSeeMore={false}
      />

      {movies.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            {paginationRange.map((p, index) => (
              <PaginationItem key={`${p}-${index}`}>
                <PaginationLink
                  onClick={() => handlePageChange(p)}
                  isActive={page === p}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchMovies;
