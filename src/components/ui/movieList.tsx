import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Rating from "./rating";
import { Movie } from "@/types/Movie";
import { cn } from "@/lib/utils";

interface MovieListProps {
  title: string;
  movies: Movie[];
  loading: boolean;
  errorMessage: string;
  categoryRoute: string;
  showSeeMore?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  title,
  movies,
  loading,
  errorMessage,
  categoryRoute,
  showSeeMore = true,
}) => {
  const { push } = useRouter();

  return (
    <div className="space-y-6 mb-5">
      <div className="flex items-center justify-between ml-4">
        <h3 className="text-foreground text-2xl font-semibold ">{title}</h3>
        {showSeeMore && (
          <div
            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
            onClick={() => {
              push(categoryRoute);
            }}>
            &quot;See more&quot; <ArrowRight />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-4">
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          (movies || []).map((movie) => (
            <div
              key={movie.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-secondary"
              onClick={() => push(`/details/${movie.id}`)}>
              <div className="relative aspect-[2/3] w-full">
                <Image
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-300 group-hover:scale-105",
                    "rounded-md"
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary to-transparent p-2">
                <Rating movie={{ vote_average: movie.vote_average }} />
                <h4 className="text-sm font-semibold text-foreground line-clamp-2">
                  {movie.title}
                </h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
