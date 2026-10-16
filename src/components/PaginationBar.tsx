import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  pathname: string;
  /** Other query params to keep on every link (e.g. query, sort). */
  query?: Record<string, string | undefined>;
}

/** Page numbers to show, with null marking a gap: 1 … 4 5 6 … 20 */
function pageRange(page: number, total: number): (number | null)[] {
  const pages = new Set([1, page - 1, page, page + 1, total]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? [null, p] : [p]));
}

export default function PaginationBar({ page, totalPages, pathname, query = {} }: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) if (value) params.set(key, value);
    params.set("page", String(p));
    return `${pathname}?${params}`;
  };
  const disabled = "pointer-events-none opacity-50";

  return (
    <Pagination className="my-8">
      <PaginationContent className="flex-wrap justify-center">
        <PaginationItem>
          <PaginationPrevious
            href={href(Math.max(page - 1, 1))}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={page <= 1 ? disabled : undefined}
          />
        </PaginationItem>
        {pageRange(page, totalPages).map((p, i) =>
          p === null ? (
            <PaginationItem key={`gap-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={href(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={href(Math.min(page + 1, totalPages))}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : undefined}
            className={page >= totalPages ? disabled : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
