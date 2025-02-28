import { db } from "@/db";
import { unstable_cache } from "next/cache";

export const getAllMainCategories = unstable_cache(
  async () => {
    return await db.query.categories.findMany({});
  },
  ["main_categories"],
  {
    tags: ["main_categories"],
  }
);