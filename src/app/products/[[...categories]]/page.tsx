import ProductGrid from "../_components/product-grid";
import { searchAndFilterInAllProducts } from "@/app/data/products-data";
import {
  getAllCategories,
  getCategoryDetailWithSlug,
} from "@/app/data/categories-data";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categories: string[] }>;
}) {
  const { categories } = await params;

  const mainCategory = categories?.[0];
  const subCategory = categories?.[1];
  const category = await getCategoryDetailWithSlug(mainCategory);

  const title = `${mainCategory} ${
    subCategory ? `- ${subCategory}` : ""
  } | Luxe Produits`;
  const description = `Découvrez notre collection exclusive de ${mainCategory} ${
    subCategory ? subCategory + " " : ""
  }produits. Découvrez des articles de haute qualité à des prix imbattables. Achetez maintenant et élevez votre style avec Luxe.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_HOST}/products/${categories.join("/")}`,
      images: [
        {
          url: category?.image || "",
          width: 800,
          height: 600,
          alt: `${mainCategory} ${
            subCategory ? subCategory + " " : ""
          }produits`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category?.image ?? ""],
    },
  };
}
export const generateStaticParams = async () => {
  const categories = await getAllCategories();
  return categories.map((c) => ({
    params: { categories: [c.mainCategory?.slug, c.slug] },
  }));
};

const parseFilterParams = (value?: string) => {
  return value ? value.split(",") : [];
};

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ categories: string[] }>;
  searchParams: Promise<{ mark?: string; q?: string; page?: string }>;
}) {
  const { categories } = await params;
  const mainCategory = categories?.[0];
  const subCategory = categories?.[1];
  const { mark, q, page } = await searchParams;
  const parsedMarks = parseFilterParams(mark);

  const products = await searchAndFilterInAllProducts({
    q,
    mainCategorySlug: mainCategory,
    category: subCategory,
    marks: parsedMarks,
    page: Number.parseInt(page ?? "1"),
  });

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
      <ProductGrid
        currentPage={Number.parseInt(page ?? "1")}
        products={products}
      />
    </>
  );
}
