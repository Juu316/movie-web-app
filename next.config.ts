import type { NextConfig } from "next";

// TMDB_API_TOKEN is read only on the server (src/lib/tmdb.ts). Do not add it to `env`:
// that inlines the value into the client JavaScript bundle.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
