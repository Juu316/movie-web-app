import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Rating from "./ui/rating";
import { tmdbImage } from "@/lib/image";
import type { MediaItem } from "@/types/media";

interface MediaGridProps {
  title: string;
  items: MediaItem[];
  seeMoreHref?: string;
  emptyMessage?: string;
  /** Show a "TV"/"Movie" badge; useful where both types mix (search). */
  showType?: boolean;
}

const GRID = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4";

export function MediaCard({ item, showType }: { item: MediaItem; showType?: boolean }) {
  return (
    <Link
      href={`/details/${item.type}/${item.id}`}
      className="group relative block overflow-hidden rounded-lg bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <div className="relative aspect-[2/3] w-full">
        <Image
          alt={item.title}
          src={tmdbImage(item.poster, "w342")}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
        {showType && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
            {item.type === "tv" ? "TV" : "Movie"}
          </span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent p-2 pt-8">
        <Rating movie={{ vote_average: item.rating }} />
        <h4 className="text-sm font-semibold text-foreground line-clamp-2">{item.title}</h4>
        {item.date && <p className="text-xs text-muted-foreground">{item.date.slice(0, 4)}</p>}
      </div>
    </Link>
  );
}

export default function MediaGrid({
  title,
  items,
  seeMoreHref,
  emptyMessage = "Nothing found.",
  showType,
}: MediaGridProps) {
  return (
    <section className="space-y-4 mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-semibold">{title}</h2>
        {seeMoreHref && (
          <Link
            href={seeMoreHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
            See more <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className={GRID}>
          {items.map((item) => (
            <MediaCard key={`${item.type}-${item.id}`} item={item} showType={showType} />
          ))}
        </div>
      )}
    </section>
  );
}

export function MediaGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="animate-pulse space-y-4 mb-10" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 rounded bg-secondary" />
      <div className={GRID}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-[2/3] rounded-lg bg-secondary" />
        ))}
      </div>
    </div>
  );
}
