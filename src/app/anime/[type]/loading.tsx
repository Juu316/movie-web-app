import { MediaGridSkeleton } from "@/components/MediaGrid";

export default function Loading() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px]">
      <MediaGridSkeleton />
    </main>
  );
}
