"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ChevronDown, Film, Moon, Search, Sun, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { tmdbImage } from "@/lib/image";
import { cn } from "@/lib/utils";
import type { Genre, MediaItem } from "@/types/media";

/** Close a popup when the user clicks outside it or presses Escape. */
function useDismiss(ref: React.RefObject<HTMLElement | null>, onDismiss: () => void) {
  const callback = useRef(onDismiss);
  callback.current = onDismiss;
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback.current();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && callback.current();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref]);
}

function SearchBox({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const { push } = useRouter();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<MediaItem[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, () => setOpen(false));

  useEffect(() => {
    const query = search.trim();
    if (!query) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        const data: { results: MediaItem[] } = await res.json();
        setSuggestions(data.results);
        setOpen(true);
      } catch {
        // Aborted by a newer keystroke, or network error: keep old suggestions.
      }
    }, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  const go = (href: string) => {
    setOpen(false);
    push(href);
  };

  return (
    <div className={cn("relative text-muted-foreground", className)} ref={ref}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" />
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (search.trim()) go(`/search?query=${encodeURIComponent(search.trim())}`);
        }}>
        <input
          type="search"
          aria-label="Search movies and series"
          className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Search movies, series, anime..."
          value={search}
          autoFocus={autoFocus}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => suggestions.length && setOpen(true)}
        />
      </form>
      {open && search.trim() && (
        <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg z-50">
          {suggestions.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">No results</p>}
          {suggestions.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={`/details/${item.type}/${item.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none">
              <Image
                src={tmdbImage(item.poster, "w92")}
                alt=""
                width={40}
                height={56}
                className="h-14 w-10 shrink-0 rounded object-cover"
              />
              <div className="min-w-0">
                <div className="truncate font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.date.slice(0, 4)}
                  {item.type === "tv" && " • TV"}
                </div>
              </div>
            </Link>
          ))}
          {suggestions.length > 0 && (
            <button
              className="w-full px-4 py-2 text-center text-sm font-semibold text-primary hover:bg-secondary"
              onClick={() => go(`/search?query=${encodeURIComponent(search.trim())}`)}>
              View all results
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function GenrePicker({ genres }: { genres: Genre[] }) {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, () => setOpen(false));

  const toggle = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="relative" ref={ref}>
      <Button className="h-9 px-3" variant="outline" aria-expanded={open} onClick={() => setOpen((p) => !p)}>
        Genre
        <ChevronDown className={cn("transition-transform", open && "rotate-180")} />
      </Button>
      {open && (
        <div className="absolute left-0 mt-2 w-[min(480px,calc(100vw-2rem))] rounded-lg border bg-popover p-4 shadow-lg z-30">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant={selected.includes(genre.id) ? "secondary" : "ghost"}
                aria-pressed={selected.includes(genre.id)}
                className="h-9 w-full justify-start"
                onClick={() => toggle(genre.id)}>
                {genre.name}
              </Button>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setSelected([])} disabled={selected.length === 0}>
              Clear
            </Button>
            <Button
              disabled={selected.length === 0}
              onClick={() => {
                setOpen(false);
                push(`/genre/${selected.join(",")}`);
              }}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      className="h-9 w-9 p-0"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {/* CSS picks the icon, so no flash before the theme is known on the client. */}
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}

const NAV = [
  { href: "/", label: "Movies" },
  { href: "/anime", label: "Anime" },
];

export default function Header({ genres }: { genres: Genre[] }) {
  const pathname = usePathname();
  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => setMobileSearch(false), [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-[58px] max-w-screen-2xl items-center justify-between gap-3 px-4">
        <Link className="flex items-center gap-x-2 text-primary" href="/">
          <Film className="size-5" />
          <span className="italic font-bold">Magixx</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  buttonVariants({ variant: active ? "secondary" : "ghost", size: "sm" }),
                  "px-2 sm:px-3",
                  item.href === "/" && "hidden sm:inline-flex"
                )}>
                {item.label}
              </Link>
            );
          })}
          <GenrePicker genres={genres} />
          <SearchBox className="hidden md:block w-[340px] ml-2" />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 w-9 p-0 md:hidden"
            aria-label={mobileSearch ? "Close search" : "Open search"}
            aria-expanded={mobileSearch}
            onClick={() => setMobileSearch((p) => !p)}>
            {mobileSearch ? <X /> : <Search />}
          </Button>
          <ThemeToggle />
        </div>
      </div>
      {mobileSearch && (
        <div className="border-t bg-background px-4 py-2 md:hidden">
          <SearchBox autoFocus />
        </div>
      )}
    </header>
  );
}
