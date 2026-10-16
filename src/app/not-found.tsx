import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 pt-[83px] min-h-[60vh] space-y-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">This movie, series or page does not exist.</p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Back home
      </Link>
    </main>
  );
}
