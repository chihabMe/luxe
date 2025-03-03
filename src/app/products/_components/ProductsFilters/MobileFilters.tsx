"use client"

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from 'lucide-react';
import ProductFilters from "./product-filters";
import * as motion from "motion/react-m";
import { getAllMainCategories } from "@/app/data/main-categories-data";
import { getProductMarks } from "@/app/data/products-data";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export default function MobileFilters({
  marks,
  mainCategories,
}: {
  marks: Awaited<ReturnType<typeof getProductMarks>>;
  mainCategories: Awaited<ReturnType<typeof getAllMainCategories>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <FilterIcon className="h-4 w-4" />
          <span>Filtres</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Filtres</h2>
          {/* <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </SheetClose> */}
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto pb-20">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <ProductFilters marks={marks} mainCategories={mainCategories} />
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
