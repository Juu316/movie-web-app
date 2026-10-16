import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaGrid from "@/components/MediaGrid";
import PaginationBar from "@/components/PaginationBar";
import { discover, getGenres, parsePage } from "@/lib/tmdb";

type Props = {
  params: Promise<{ genre: string }>;
  searchParams: Promise<{ page?: string }>;
};

/** "28,12" or "28%2C12" -> ["28", "12"] */
function parseGenreIds(param: string) {
  return decodeURIComponent(param)
    .split(",")
    .map((id) => id.trim())
    .filter((id) => /^\d+$/.test(id));
}

async function genreTitle(ids: string[]) {
  const genres = await getGenres("movie");
  const names = ids.map((id) => genres.find((g) => String(g.id) === id)?.name).filter(Boolean);
  return names.length ? `${names.join(", ")} Movies` : "Movies";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: await genreTitle(parseGenreIds((await params).genre)) };
}

export default async function GenrePage({ params, searchParams }: Props) {
  const ids = parseGenreIds((await params).genre);
  if (ids.length === 0) notFound();
  const page = parsePage((await searchParams).page);
  const [data, title] = await Promise.all([
    // Comma = movies that have ALL selected genres.
    discover("movie", { with_genres: ids.join(","), sort_by: "popularity.desc" }, page),
    genreTitle(ids),
  ]);

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px]">
      <MediaGrid title={title} items={data.results} emptyMessage="No movies match all selected genres." />
      <PaginationBar page={page} totalPages={data.totalPages} pathname={`/genre/${ids.join(",")}`} />
    </main>
  );
}
