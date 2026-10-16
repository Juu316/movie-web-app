import type { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid";
import PaginationBar from "@/components/PaginationBar";
import { parsePage, searchMulti } from "@/lib/tmdb";

type Props = { searchParams: Promise<{ query?: string; page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { query } = await searchParams;
  return { title: query ? `Search: ${query}` : "Search" };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const page = parsePage(params.page);

  if (!query) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 pt-[83px] min-h-[50vh]">
        <p className="text-muted-foreground">Type a movie or series name in the search bar.</p>
      </main>
    );
  }

  const data = await searchMulti(query, page);

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px] min-h-[50vh]">
      <MediaGrid
        title={`Results for "${query}"`}
        items={data.results}
        emptyMessage="No movies or series found."
        showType
      />
      <PaginationBar page={page} totalPages={data.totalPages} pathname="/search" query={{ query }} />
    </main>
  );
}
