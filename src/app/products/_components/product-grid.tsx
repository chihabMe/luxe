"use client";
import * as motion from "motion/react-m";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { searchAndFilterInAllProducts } from "@/app/data/products-data";
import { Fragment } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProductGrid({
  products,
  currentPage,
}: {
  products: Awaited<ReturnType<typeof searchAndFilterInAllProducts>>;
  currentPage: number;
}) {
  const { pageCount: totalPages } = products;
  const { categories } = useParams() as { categories: string[] };
  const mainCategory = categories ? categories[0] : undefined;
  const subCategory = categories ? categories[1] : undefined;
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const mark = searchParams.get("mark");
  let finalPath = `/products`;
  if (mainCategory) finalPath += `/${mainCategory}`;
  if (subCategory) finalPath += `/${subCategory}`;
  finalPath += "?";
  if (q) finalPath += `q=${q}`;
  if (mark) finalPath += `&&mark=${mark}`;

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Show current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (pageNumbers.indexOf(i) === -1) pageNumbers.push(i);
    }

    // Always show last page
    if (totalPages > 1) pageNumbers.push(totalPages);

    return pageNumbers.sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <motion.div
        className="grid min-h-[50vh] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <Button
              disabled={currentPage < 2}
              variant="outline"
              className={`${currentPage < 2 && "opacity-30 pointer-events-none "}  w-10 h-10 p-0 `}
              asChild
            >
              <Link href={`${finalPath}&&page=${currentPage - 1}`}>
                <ChevronLeft size={16} />
              </Link>
            </Button>

            {pageNumbers.map((page, index) => (
              <Fragment key={page}>
                {index > 0 &&
                  pageNumbers[index] - pageNumbers[index - 1] > 1 && (
                    <Button
                      asChild
                      disabled
                      variant="outline"
                      className="w-10 h-10 p-0"
                    >
                      ...
                    </Button>
                  )}
                <Button
                  asChild
                  variant={currentPage === page ? "default" : "outline"}
                  className="w-10 h-10 p-0"
                >
                  <Link href={`${finalPath}&&page=${page}`}>{page}</Link>
                </Button>
              </Fragment>
            ))}

              <Button disabled={currentPage>=totalPages} asChild variant="outline" className={ `${currentPage>=totalPages&&"opacity-30 pointer-events-none"}  w-10 h-10 p-0` }>
                <Link href={`${finalPath}&&page=${currentPage + 1}`}>
                  <ChevronRight size={16} />
                </Link>
              </Button>
          </div>
        </div>
      )}
    </>
  );
}
