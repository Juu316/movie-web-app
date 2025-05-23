"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Movie } from "@/types/Movie";
import MovieList from "@/components/ui/movieList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Genre = () => {
  const token = process.env.TMDB_API_TOKEN;
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const genreParam = params.genre;
  const genreIds = genreParam ? genreParam.toString() : "";
  const initialPage = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [genreMap, setGenreMap] = useState<Record<string, string>>({});

  const fetchMoviesWithGenre = async (genreIds: string, page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            language: "en",
            with_genres: genreIds,
            page: page,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genreIds) {
      fetchMoviesWithGenre(genreIds, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreIds, page, token]);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: { language: "en" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const map: Record<string, string> = {};
        res.data.genres.forEach((genre: { id: number; name: string }) => {
          map[genre.id.toString()] = genre.name;
        });
        setGenreMap(map);
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };

    fetchGenreList();
  }, [token]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`/genre/${genreIds}?${newParams.toString()}`);
    setPage(newPage);
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
  // GenreId aa genre name bolgoh heseg
  const genreNames = genreIds
    .split("%2C")
    .map((id) => genreMap[id.trim()])
    .filter(Boolean)
    .join(", ");
  const title = `Movies for Genres: ${genreNames}`;

  return (
    <div className="mt-[59px] p-4">
      <MovieList
        title={title}
        movies={movies}
        loading={loading}
        errorMessage={errorMessage}
        categoryRoute={`/genre/${genreIds}`}
        showSeeMore={false}
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/genre/${genreIds}?page=${page - 1}`}
              onClick={() => handlePageChange(page - 1)}
              aria-disabled={page === 1}
            />
          </PaginationItem>
          {paginationRange.map((p, index) => (
            <PaginationItem key={`${p}-${index}`}>
              <PaginationLink
                href={`/genre/${genreIds}?page=${p}`}
                isActive={page === p}
                onClick={() => handlePageChange(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={`/genre/${genreIds}?page=${page + 1}`}
              onClick={() => handlePageChange(page + 1)}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Genre;
