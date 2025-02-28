import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { mainCategories, selectMainCategorySchema } from "@/db/schema";
import { protectedActionClient } from "@/lib/safe-actions";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";
import { z } from "zod";

export const getAllMainCategories = unstable_cache(
  async () => {
    return await db.query.mainCategories.findMany({});
  },
  ["main_categories"],
  {
    tags: ["main_categories"],
  }
);

interface GetMainCategoriesParams {
  page: number;
  q?: string;
  isActive?: boolean;
}

interface MainCategoriesResponse {
  data: Array<z.infer<typeof selectMainCategorySchema>>;
  hasNext: boolean;
  hasPrev: boolean;
  count: number;
  pageCount: number;
}

export const getMainCategories = cache(
  async ({
    page,
    q,
  }: GetMainCategoriesParams): Promise<MainCategoriesResponse> => {
    const categoriesQuery = db.query.mainCategories.findMany({
      where: and(
        q ? sql`${mainCategories.name} LIKE ${`%${q}%`}  ` : undefined
      ),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });

    const result = await categoriesQuery;
    const totalCount = await getTotalMainCategoriesCount({ q });
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

export const getTotalMainCategoriesCount = cache(
  async (params?: { q?: string }) => {
    const { q } = params || {};

    const result = await db
      .select({ count: sql`count(*)` })
      .from(mainCategories)
      .where(
        and(q ? sql`${mainCategories.name} LIKE ${`%${q}%`} ` : undefined)
      );

    return Number(result[0]?.count ?? 0);
  }
);

