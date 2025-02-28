"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  baseHref: string;
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageCount: number; // Add pageCount to the Props interface
  q?: string;
}

export function PagePaginator({
  baseHref,
  page,
  hasNext,
  q,
  hasPrev,
  pageCount,
}: Props) {
  const pageRange = 1; // We'll show up to 3 pages (current page + 1 before + 1 after)
  const pages = [];

  // Calculate start and end page numbers
  let startPage = Math.max(1, page - pageRange);
  let endPage = Math.min(pageCount, page + pageRange);

  // Adjust start and end to always show 3 pages if possible
  if (endPage - startPage + 1 < 3) {
    if (startPage === 1) {
      endPage = Math.min(3, pageCount);
    } else if (endPage === pageCount) {
      startPage = Math.max(1, pageCount - 2);
    }
  }

  // Generate page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          {hasPrev ? (
            <PaginationPrevious
              size="sm"
              href={`${baseHref}?page=${page - 1}${q ? `&search=${q}` : ""}`}
            />
          ) : (
            <PaginationPrevious
              href={`${baseHref}?page=${page - 1}${q ? `&search=${q}` : ""}`}
              size="sm"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
            />
          )}
        </PaginationItem>

        {/* Render page links dynamically */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              size="sm"
              href={`${baseHref}?page=${p}${q ? `&search=${q}` : ""}`}
              className={
                p === page
                  ? "bg-primary/90 hover:text-white text-white hover:bg-primary"
                  : ""
              }
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          {hasNext ? (
            <PaginationNext
              size="sm"
              href={`${baseHref}?page=${page + 1}${q ? `&search=${q}` : ""}`}
            />
          ) : (
            <PaginationNext
              size="sm"
              className="pointer-events-none opacity-50"
              href={`${baseHref}?page=${page + 1}${q ? `&search=${q}` : ""}`}
              aria-disabled="true"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
