"use client";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Rating from "./ui/rating";
import { tmdbImage } from "@/lib/image";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/types/media";

const arrowClass =
  "absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-30";

export default function Slider({ items }: { items: MediaItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  if (items.length === 0) return <div className="h-[59px]" />;

  return (
    <section className="relative mt-[59px] bg-black text-white" aria-roledescription="carousel">
      <div ref={sliderRef} className="keen-slider h-[60vh] sm:h-[80vh]">
        {items.map((movie, idx) => (
          <div key={movie.id} className="keen-slider__slide relative">
            <Image
              alt=""
              src={tmdbImage(movie.backdrop, "w1280")}
              fill
              sizes="100vw"
              className="object-cover opacity-60"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <Link
              href={`/details/movie/${movie.id}`}
              className="absolute bottom-16 left-4 right-4 sm:left-12 sm:right-auto z-10 flex max-w-lg gap-4 rounded-lg bg-black/60 p-3 backdrop-blur-sm transition hover:bg-black/75">
              <Image
                alt={movie.title}
                src={tmdbImage(movie.poster, "w185")}
                width={80}
                height={120}
                className="h-[120px] w-[80px] shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold line-clamp-1">{movie.title}</h2>
                <div className="flex gap-4 text-sm text-white/80 [&_span]:!text-white">
                  <Rating movie={{ vote_average: movie.rating }} />
                  <span>{movie.date}</span>
                </div>
                <p className="mt-1 text-xs text-white/80 line-clamp-3">{movie.overview}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {loaded && (
        <>
          <button className={cn(arrowClass, "left-3")} aria-label="Previous slide" onClick={() => instanceRef.current?.prev()}>
            <ChevronLeft className="size-6" />
          </button>
          <button className={cn(arrowClass, "right-3")} aria-label="Next slide" onClick={() => instanceRef.current?.next()}>
            <ChevronRight className="size-6" />
          </button>
          <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2">
            {items.map((movie, idx) => (
              <button
                key={movie.id}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={currentSlide === idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  currentSlide === idx ? "w-6 bg-primary" : "w-2 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
