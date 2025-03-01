import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { eq, and, or, gte, lte, ilike, inArray, sql, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import slugify from "slugify";
// import { z } from "zod";

// interface ProductsResponse {
//   data: Array<z.infer<typeof selectProductSchema> & {
//     images: { url: string; cloudId: string }[];
//   }>;
//   hasNext: boolean;
//   hasPrev: boolean;
//   count: number;
//   pageCount: number;
// }

interface GetProductsParams {
  page: number;
  q?: string;
  category?: string;
  mark?: string;
}

export const searchAndFilterInAllProducts = cache(
  async ({
    q,
    sortByPrice,
    categories: categorySlugs,
    marks,
  }: {
    q?: string;
    sortByPrice?: "asc" | "desc";
    categories?: string[];
    marks?: string[];
  }) => {
    let whereClause = undefined;
    const filters = [];

    // Search in name or description
    if (q) {
      filters.push(
        or(
          ilike(products.name, `%${q}%`),
          ilike(products.description, `%${q}%`)
        )
      );
    }

    if (marks && marks.length > 0) {
      filters.push(inArray(products.mark, marks));
    }

    // Category filtering - now using the correct relationship
    if (categorySlugs && categorySlugs.length > 0) {
      // First get the category IDs for the given slugs
      const matchingCategories = await db.query.categories.findMany({
        where: inArray(categories.slug, categorySlugs),
      });

      const categoryIds = matchingCategories.map((cat) => cat.id);
      if (categoryIds.length > 0) {
        filters.push(inArray(products.categoryId, categoryIds));
      }
    }

    // Combine all filters with AND
    if (filters.length > 0) {
      whereClause = and(...filters);
    }

    // Build query
    const filteredProducts = await db.query.products.findMany({
      where: whereClause,
      with: {
        images: true,
        category: true,
        specifications: true,
      },
    });

    return filteredProducts;
  }
);

// Get all featured and active products with their images
export const getAllFeaturedActiveProducts = unstable_cache(
  async (limit?: number) => {
    return await db.query.products.findMany({
      where: eq(products.isFeatured, true),
      with: {
        images: true,
      },
      limit,
    });
  },
  ["featured_products"],
  {
    tags: ["featured_products"],
  }
);
export const getProductMarks = unstable_cache(
  async () => {
    return await db
      .select({ mark: products.mark, count: count() })
      .from(products)
      .groupBy(products.mark);
  },
  ["products"],
  {
    tags: ["products"],
  }
);

// Get all active products
export const getAllActiveProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      with: {
        images: true,
      },
    });
  },
  ["active_products"],
  {
    tags: ["active_products"],
  }
);

// Get all products
export const getAllProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      with: {
        images: true,
      },
    });
  },
  ["products"],
  {
    tags: ["products"],
  }
);

// Get product detail with slug
export const getProductDetailWithSlug = unstable_cache(
  async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    return await db.query.products.findFirst({
      where: eq(products.slug, decodedSlug),
      with: {
        images: true,
        category: true,
        specifications: true,
      },
    });
  },
  ["product_details"],
  { tags: ["product_details"] }
);

// Get paginated products with optional search
export const getProducts = cache(
  async ({ page, q, category, mark }: GetProductsParams) => {
    const sluggedCategory = slugify(category ?? "");
    const foundCategory = await db.query.categories.findFirst({
      where: eq(products.slug, sluggedCategory),
    });
    const productsQuery = db.query.products.findMany({
      where: and(
        foundCategory ? eq(products.categoryId, foundCategory.id) : undefined,
        q
          ? sql`${products.name} LIKE ${`%${q}%`} OR ${
              products.description
            } LIKE ${`%${q}%`}`
          : undefined,
        mark ? sql`${products.mark} = ${mark}` : undefined
      ),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      with: {
        images: true,
        category: {
          with: {
            mainCategory: true,
          },
        },
        specifications: {
          with: {
            values:true
          },
        },
      },
    });

    const result = await productsQuery;
    const totalCount = await getTotalProductsCount();
    const pageCount = Math.ceil(totalCount / PAGE_SIZE);

    return {
      data: result,
      hasNext: page < pageCount,
      hasPrev: page > 1,
      count: totalCount,
      pageCount,
    };
  }
);

// Get total count of all products
export const getTotalProductsCount = cache(async () => {
  return db.$count(products);
});

// Get count of products created today
export const getTotalProductsCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.products.findMany({
    where: sql`DATE(${products.createdAt}) = ${
      today.toISOString().split("T")[0]
    }`,
    columns: {
      id: true,
    },
  });

  return result.length;
});
// Get the latest 4 products
export const getLatestProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      orderBy: (products, { desc }) => [desc(products.createdAt)],
      limit: 4, // Limit to the latest 4 products
      with: {
        images: true, // Include associated images
      },
    });
  },
  ["latest_products"], // Cache key
  {
    tags: ["latest_products"], // Cache tags
  }
);

export const getProductDetailWithId = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      images: true,
      category: true,
      specifications: true,
    },
  });
};
export const getProductsByCategory = unstable_cache(
  async (categorySlug: string) => {
    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });

    if (!category) {
      return [];
    }

    return await db.query.products.findMany({
      where: eq(products.categoryId, category.id),
      with: {
        images: true,
      },
    });
  },
  ["category_products"],
  {
    tags: ["category_products"],
  }
);
