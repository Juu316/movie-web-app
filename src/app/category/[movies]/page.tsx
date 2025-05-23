"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/types/Movie";
import MovieList from "@/components/ui/movieList";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Category = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.TMDB_API_TOKEN;
  const { movies: category } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);
  const fetchCategory = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovieData(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error fetching ${category} movies`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchCategory(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, token, currentPage]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`/category/${category}?${newParams.toString()}`);
  };

  const getPaginationRange = () => {
    const pages: number[] = [];
    pages.push(1);
    if (currentPage - 1 > 1) {
      pages.push(currentPage - 1);
    }
    if (currentPage !== 1) {
      pages.push(currentPage);
    }
    if (currentPage + 1 <= totalPages) {
      pages.push(currentPage + 1);
    }
    return Array.from(new Set(pages)).sort((a, b) => a - b);
  };

  const paginationRange = getPaginationRange();

  return (
    <>
      <div className="mt-[59px] mb-4">
        <MovieList
          title={
            category
              ? category.toString().charAt(0).toUpperCase() +
                category.toString().slice(1)
              : "Category"
          }
          movies={movieData}
          loading={loading}
          errorMessage={errorMessage}
          categoryRoute={`/category/${category}`}
          showSeeMore={false}
        />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/category/${category}?page=${currentPage - 1}`}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {paginationRange.map((page, index) => (
              <PaginationItem key={`${page}-${index}`}>
                <PaginationLink
                  href={`/category/${category}?page=${page}`}
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`/category/${category}?page=${currentPage + 1}`}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Category;
