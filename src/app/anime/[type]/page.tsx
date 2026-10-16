import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaGrid from "@/components/MediaGrid";
import PaginationBar from "@/components/PaginationBar";
import { buttonVariants } from "@/components/ui/button";
import { ANIME_SORTS, AnimeSort, getAnime, parsePage } from "@/lib/tmdb";

type Props = {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
};

const LABELS = { tv: "Anime Series", movie: "Anime Movies" } as const;
const isType = (value: string): value is keyof typeof LABELS => value in LABELS;
const toSort = (value?: string): AnimeSort =>
  value && value in ANIME_SORTS ? (value as AnimeSort) : "popular";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  return { title: isType(type) ? LABELS[type] : "Not found" };
}

export default async function AnimeListPage({ params, searchParams }: Props) {
  const { type } = await params;
  if (!isType(type)) notFound();
  const query = await searchParams;
  const sort = toSort(query.sort);
  const page = parsePage(query.page);
  const data = await getAnime(type, { sort, page });

  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px]">
      <nav className="mb-6 flex flex-wrap gap-2" aria-label="Sort">
        {(Object.keys(LABELS) as (keyof typeof LABELS)[]).map((t) => (
          <Link
            key={t}
            href={`/anime/${t}?sort=${sort}`}
            className={buttonVariants({ variant: t === type ? "secondary" : "ghost", size: "sm" })}>
            {LABELS[t]}
          </Link>
        ))}
        <span className="mx-1 w-px bg-border" />
        {(Object.entries(ANIME_SORTS) as [AnimeSort, string][]).map(([key, label]) => (
          <Link
            key={key}
            href={`/anime/${type}?sort=${key}`}
            aria-current={key === sort ? "true" : undefined}
            className={buttonVariants({ variant: key === sort ? "outline" : "ghost", size: "sm" })}>
            {label}
          </Link>
        ))}
      </nav>
      <MediaGrid title={`${ANIME_SORTS[sort]} ${LABELS[type]}`} items={data.results} />
      <PaginationBar page={page} totalPages={data.totalPages} pathname={`/anime/${type}`} query={{ sort }} />
    </main>
  );
}
