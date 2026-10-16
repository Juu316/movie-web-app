import { Film } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-12 w-full border-t bg-secondary py-10 px-5 text-sm text-secondary-foreground">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-y-7 md:flex-row">
        <div className="space-y-3">
          <Link className="flex items-center gap-x-2 text-primary" href="/">
            <Film className="size-5" />
            <span className="italic font-bold">Magixx</span>
          </Link>
          <p>© {new Date().getFullYear()} Magixx. All Rights Reserved.</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            This product uses the TMDB API but is not endorsed or certified by{" "}
            <a href="https://www.themoviedb.org" className="underline" target="_blank" rel="noopener noreferrer">
              TMDB
            </a>
            .
          </p>
        </div>

        <div className="flex gap-x-12 lg:gap-x-24">
          <div className="space-y-3">
            <h4 className="font-semibold">Browse</h4>
            <ul className="space-y-2">
              <li><Link href="/category/popular" className="hover:underline">Popular movies</Link></li>
              <li><Link href="/category/top_rated" className="hover:underline">Top rated movies</Link></li>
              <li><Link href="/anime" className="hover:underline">Anime</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">Follow us</h4>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline">
              Youtube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
