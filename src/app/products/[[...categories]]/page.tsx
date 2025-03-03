import ProductGrid from "../_components/product-grid"
import { searchAndFilterInAllProducts } from "@/app/data/products-data"

const parseFilterParams = (value?: string) => {
  return value ? value.split(",") : []
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ categories: string[] }>
  searchParams: Promise<{ mark?: string; q?: string; page?: string }>
}) {
  const { categories } = await params
  const mainCategory = categories?.[0]
  const subCategory = categories?.[1]
  const { mark, q, page } = await searchParams
  const parsedMarks = parseFilterParams(mark)

  const products = await searchAndFilterInAllProducts({
    q,
    mainCategorySlug: mainCategory,
    category: subCategory,
    marks: parsedMarks,
    page: Number.parseInt(page ?? "1"),
  })

  return (
    <>
      {/* Page title and filters */}
      <div className="flex flex-col mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-1">
          {mainCategory} {subCategory ? `- ${subCategory}` : ""}
        </h1>
        <p className="text-sm text-gray-600">{products.data.length} produits</p>
      </div>

      {/* Products Grid */}
      <ProductGrid currentPage={Number.parseInt(page ?? "1")} products={products} />
    </>
  )
}

