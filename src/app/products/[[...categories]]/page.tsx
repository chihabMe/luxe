import Product from "@/app/interfaces/Product";
import { Suspense } from "react";
import PromotionalBanner from "../_components/promotional-banner";
import CategoriesNavigation from "../_components/categories-navigation";
import ProductSorting from "../_components/product-sorting";
import ProductFilters from "../_components/product-filters";
import ProductGrid from "../_components/product-grid";
import { Navbar } from "@/components/layout/navbar/navbar";
import { getAllMainCategories } from "@/app/data/main-categories-data";
const products: Product[] = [
  {
    id: 1,
    name: "T-shirt en coton",
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    image: "/images/products/product1.jpg",
    category: "clothing",
    isNew: false,
    isSecondHand: true,
  },
  {
    id: 2,
    name: "Jean slim",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: "/images/products/product2.jpg",
    category: "clothing",
    isNew: false,
    isSecondHand: true,
  },
  {
    id: 3,
    name: "Veste en cuir",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: "/images/products/product3.jpg",
    category: "clothing",
    isNew: false,
    isSecondHand: true,
  },
];

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ categories: string[] }>;
}) {
  const { categories } = await params;
  const mainCategory = categories ? categories[0] : null;
  const subCategory = categories ? categories[1] : null;
  const mainCategories = await getAllMainCategories()

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white">
      {/* Categories navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <CategoriesNavigation />
        </div>
      </div>

        {/* <PromotionalBanner /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Page title and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {mainCategory} {subCategory ? subCategory : "aucune catégorie"}
            </h1>
            <p className="text-gray-600">{products.length} produits</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <ProductSorting />
          </div>
        </div>

        {/* Sidebar and Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <ProductFilters mainCategories={mainCategories} />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
