import { redirect } from "next/navigation";

// Old URL format (/details/123); details now live under /details/movie and /details/tv.
export default async function LegacyDetails({ params }: { params: Promise<{ id: string }> }) {
  redirect(`/details/movie/${(await params).id}`);
}
