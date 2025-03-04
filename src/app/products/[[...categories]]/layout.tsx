import type React from "react";
import { Navbar } from "@/components/layout/navbar/navbar";
import { getAllMainCategories } from "@/app/data/main-categories-data";
import { getProductMarks } from "@/app/data/products-data";
import ProductFilters from "../_components/ProductsFilters/product-filters";
import CategoriesNavigation from "../_components/categories-navigation";
import MobileFilters from "../_components/ProductsFilters/MobileFilters";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainCategories = await getAllMainCategories();
  const marks = await getProductMarks();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Categories navigation */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <CategoriesNavigation />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden sticky top-0 z-10 bg-white pb-4">
              <MobileFilters marks={marks} mainCategories={mainCategories} />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block md:col-span-1">
              <div className="sticky top-4">
                <ProductFilters marks={marks} mainCategories={mainCategories} />
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
