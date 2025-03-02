import Product from "@/app/interfaces/Product";
import CategoriesNavigation from "../_components/categories-navigation";
import ProductFilters from "../_components/ProductsFilters/product-filters";
import ProductGrid from "../_components/product-grid";
import { Navbar } from "@/components/layout/navbar/navbar";
import { getAllMainCategories } from "@/app/data/main-categories-data";
import { getProductMarks, searchAndFilterInAllProducts } from "@/app/data/products-data";

const parseFilterParams = (value?: string) => {
  return value ? value.split(",") : [];
};

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { categories: string[] };
  searchParams: { mark?: string; q?: string };
}) {
  const { categories } = params;
  const mainCategory = categories?.[0];
  const subCategory = categories?.[1];
  const mainCategories = await getAllMainCategories();
  const marks = await getProductMarks();
  const parsedMarks = parseFilterParams(searchParams.mark);

  const products = await searchAndFilterInAllProducts({
    q: searchParams.q??"",
    mainCategorySlug: mainCategory,
    category: subCategory,
    marks: parsedMarks,
  });

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
          {/* Page title and filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {mainCategory} {subCategory ? subCategory : "aucune catégorie"}
              </h1>
              <p className="text-gray-600">{products.length} produits</p>
            </div>
          </div>

          {/* Sidebar and Products */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <ProductFilters marks={marks} mainCategories={mainCategories} />
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