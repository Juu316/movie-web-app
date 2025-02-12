import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    TMDB_BASE_URL: process.env.TMDB_BASE_URL ||"",
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN ||"",
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL ||"",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**", // Allow all paths under /t/p/
      },
    ],
  },
};

export default nextConfig;









