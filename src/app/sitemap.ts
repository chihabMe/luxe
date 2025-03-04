import { MetadataRoute } from "next";
import { getAllCategories } from "./data/categories-data";
import { getAllProducts } from "./data/products-data";

export const sitemap = async ():Promise<MetadataRoute.Sitemap>=>{

  const categories = await getAllCategories();
const productsFromCategories= categories? categories.map((c) => ({
    url: `${process.env.NEXT_PUBLIC_HOST}/products/${c.mainCategory?.slug}/${c.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: new Date().toISOString(),
})):[];
  const products = await getAllProducts()
  const productDetailsPage = products ?  products.map(product => ({

    url: `${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  })):[]
  return [
    {
      url: process.env.NEXT_PUBLIC_HOST ??"",
      priority: 1,
      changeFrequency: "daily" ,
    },
    ...productsFromCategories,
    ...productDetailsPage

  ]
}

export default sitemap;