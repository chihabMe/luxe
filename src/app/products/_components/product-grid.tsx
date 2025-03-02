import * as motion from "motion/react-m";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type Product from "@/app/interfaces/Product";
import ProductCard from "./ProductCard";
import { searchAndFilterInAllProducts } from "@/app/data/products-data";

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
}: {
  products: Awaited<ReturnType<typeof searchAndFilterInAllProducts>>;
}) {
  return (
    <>
      <motion.div
        className="grid min-h-[50vh] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          <Button variant="outline" className="w-10 h-10 p-0">
            1
          </Button>
          <Button variant="outline" className="w-10 h-10 p-0">
            2
          </Button>
          <Button variant="outline" className="w-10 h-10 p-0">
            3
          </Button>
          <Button variant="outline" className="w-10 h-10 p-0">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}
