"use client";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px] min-h-[60vh] space-y-4">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">
        Could not load data from TMDB. {error.digest && <span>(ref: {error.digest})</span>}
      </p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
