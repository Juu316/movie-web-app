import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getGenres } from "@/lib/tmdb";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: { default: "Magixx — Movies & Anime", template: "%s | Magixx" },
  description:
    "Browse movies, TV series and anime: ratings, cast, trailers and similar titles, powered by TMDB.",
  icons: { icon: "/favicon.ico" },
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Header still renders (without genres) if TMDB is down.
  const genres = await getGenres("movie").catch(() => []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header genres={genres} />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
