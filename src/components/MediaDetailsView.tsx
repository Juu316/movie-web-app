import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import MediaGrid from "./MediaGrid";
import { tmdbImage } from "@/lib/image";
import type { MediaDetails } from "@/types/media";

export function detailsMetadata(data: MediaDetails | null): Metadata {
  if (!data) return { title: "Not found" };
  return {
    title: data.title,
    description: data.overview.slice(0, 160),
    openGraph: { images: data.backdrop ? [tmdbImage(data.backdrop, "w1280")] : [] },
  };
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

export default function MediaDetailsView({ data }: { data: MediaDetails }) {
  const isTv = data.type === "tv";

  return (
    <main className="pt-[59px]">
      <section className="relative overflow-hidden">
        {data.backdrop && (
          <Image
            src={tmdbImage(data.backdrop, "w1280")}
            alt=""
            fill
            priority
            className="object-cover opacity-20 blur-sm"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/40" />

        <div className="relative max-w-screen-xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
          <Image
            src={tmdbImage(data.poster, "w500")}
            alt={data.title}
            width={300}
            height={450}
            priority
            className="mx-auto md:mx-0 h-auto w-[220px] md:w-[300px] shrink-0 self-start rounded-2xl shadow-lg"
          />

          <div className="flex-1 space-y-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {data.title}{" "}
                {data.date && (
                  <span className="font-normal text-muted-foreground">({data.date.slice(0, 4)})</span>
                )}
              </h1>
              {data.tagline && <p className="mt-1 italic text-muted-foreground">{data.tagline}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 text-lg font-semibold">
                <Star className="size-5 fill-yellow-300 stroke-yellow-300" />
                {data.rating.toFixed(1)}
                <span className="text-sm font-normal text-muted-foreground">
                  /10 · {data.voteCount.toLocaleString()} votes
                </span>
              </span>
              {data.genres.map((g) =>
                isTv ? (
                  <span key={g.id} className="rounded-full border px-3 py-0.5 text-xs">
                    {g.name}
                  </span>
                ) : (
                  <Link
                    key={g.id}
                    href={`/genre/${g.id}`}
                    className="rounded-full border px-3 py-0.5 text-xs hover:bg-secondary">
                    {g.name}
                  </Link>
                )
              )}
            </div>

            {data.overview && <p className="text-lg leading-relaxed">{data.overview}</p>}

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Fact label={isTv ? "First aired" : "Release date"} value={data.date} />
              <Fact label={isTv ? "Episode length" : "Runtime"} value={data.runtime ? `${data.runtime} min` : null} />
              {isTv && (
                <Fact
                  label="Seasons"
                  value={data.seasons ? `${data.seasons} (${data.episodes} episodes)` : null}
                />
              )}
              <Fact label={isTv ? "Created by" : "Director"} value={data.directors.join(", ")} />
              <Fact label="Country" value={data.countries.join(", ")} />
              <Fact label="Language" value={data.languages.join(", ")} />
            </dl>

            {data.cast.length > 0 && (
              <div>
                <h2 className="mb-2 text-sm uppercase tracking-wide text-muted-foreground">Cast</h2>
                <ul className="flex gap-3 overflow-x-auto pb-2">
                  {data.cast.map((c) => (
                    <li key={c.id} className="w-20 shrink-0 text-center">
                      <Image
                        src={tmdbImage(c.profile, "w185")}
                        alt={c.name}
                        width={80}
                        height={80}
                        className="mx-auto size-16 rounded-full object-cover"
                      />
                      <p className="mt-1 text-xs font-medium line-clamp-2">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{c.character}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4">
        {data.trailerKey && (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold">Trailer</h2>
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${data.trailerKey}`}
                title={`${data.title} trailer`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
        <MediaGrid title={isTv ? "Similar series" : "Similar movies"} items={data.similar} />
      </div>
    </main>
  );
}

export function MediaDetailsSkeleton() {
  return (
    <div className="animate-pulse pt-[59px]">
      <div className="max-w-screen-xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        <div className="mx-auto md:mx-0 w-[220px] md:w-[300px] aspect-[2/3] rounded-2xl bg-secondary" />
        <div className="flex-1 space-y-4">
          <div className="h-9 w-3/4 rounded bg-secondary" />
          <div className="h-5 w-1/3 rounded bg-secondary" />
          <div className="h-24 w-full rounded bg-secondary" />
          <div className="h-16 w-2/3 rounded bg-secondary" />
        </div>
      </div>
    </div>
  );
}
