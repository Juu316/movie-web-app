import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaGrid from "@/components/MediaGrid";
import PaginationBar from "@/components/PaginationBar";
import { getMovieList, MOVIE_CATEGORIES, MovieCategory, parsePage } from "@/lib/tmdb";

type Props = {
  params: Promise<{ movies: string }>;
  searchParams: Promise<{ page?: string }>;
};

const isCategory = (value: string): value is MovieCategory => value in MOVIE_CATEGORIES;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movies } = await params;
  return { title: isCategory(movies) ? `${MOVIE_CATEGORIES[movies]} Movies` : "Not found" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { movies: category } = await params;
  if (!isCategory(category)) notFound();
  const page = parsePage((await searchParams).page);
  const data = await getMovieList(category, page);

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px]">
      <MediaGrid title={`${MOVIE_CATEGORIES[category]} Movies`} items={data.results} />
      <PaginationBar page={page} totalPages={data.totalPages} pathname={`/category/${category}`} />
    </main>
  );
}
