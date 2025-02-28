"use server";
import { categories, mainCategories } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import slugify from "slugify";
const createMainCategorySchema = z.object({
  name: z.string(),
  isActive: z.boolean(),
});
export const createMainCategory = actionClient
  .schema(createMainCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Generate slug from name
      const slug = slugify(parsedInput.name, { lower: true, locale: "fr" });

      // Check if slug already exists
      const existingCategory = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, slug),
      });

      if (existingCategory) {
        return {
          success: false,
          error: "A category with this name already exists",
        };
      }

      const result = await ctx.db
        .insert(mainCategories)
        .values({
          slug,
          name: parsedInput.name,
          isActive: parsedInput.isActive,
        })
        .returning({ id: categories.id });

      revalidateTag("categories");
      revalidateTag("featured_product_categories");
      revalidateTag("featured_categories");
      revalidateTag("active_product_categories");
      revalidateTag("main_categories");
      revalidatePath("/admin/dashboard/categories");
      revalidatePath("/");

      return {
        success: true,
        data: {
          success: true,
          id: result[0]?.id,
        },
      };
    } catch (err) {
      console.error("Error creating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });


export const deleteMainCategory = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db
        .delete(mainCategories)
        .where(eq(mainCategories.id, parsedInput.id));

      revalidateTag("featured_product_categories");
      revalidateTag("featured_categories");
      revalidateTag("active_product_categories");
      revalidateTag("active_product_categories");
      revalidateTag("main_categories");
      revalidateTag("active_main_categories");
      revalidateTag("categories");
      revalidatePath("/admin/dashboard/categories");
      revalidatePath("/admin/dashboard/products");
      return { success: true };
    } catch (err) {
      console.error("Error deleting product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });