"use server";
import { categories, mainCategories } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { and, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import slugify from "slugify";

const updateProductCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  isFeatured: z.boolean(),
  imageUrl: z.string().optional(),
  cloudId: z.string().optional(),
  mainCategoryId: z.string(),
});

export const updateProductCategory = protectedActionClient
  .schema(updateProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const mainCategory = await ctx.db.query.mainCategories.findFirst({
        where: eq(mainCategories.id, parsedInput.mainCategoryId),
      });

      if (!mainCategory) {
        return {
          success: false,
          error: "Main category not found",
        };
      }

      // Start a transaction to ensure data consistency
      const result = await ctx.db.transaction(async (tx) => {
        // Generate new slug based on name
        const slug = slugify(parsedInput.name, { lower: true });

        // Update product category details
        await tx
          .update(categories)
          .set({
            name: parsedInput.name,
            slug: slug, // Update slug when name changes
            mainCategoryId: parsedInput.mainCategoryId,
            isFeatured: parsedInput.isFeatured,
            image: parsedInput.imageUrl || "",
          })
          .where(eq(categories.id, parsedInput.id));

        return true;
      });

      if (!result) {
        throw new Error("Failed to update product category");
      }

      // Revalidate the path to reflect the updated data
      revalidateTag("featured_product_categories");
      revalidateTag("active_product_categories");
      revalidateTag("featured_categories");
      revalidateTag("categories");
      revalidatePath("/admin/dashboard/categories");
      revalidatePath("/admin/dashboard/products");
      revalidatePath("/");

      return {
        success: true,
        data: { success: true },
      };
    } catch (err) {
      console.error("Error updating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

export const deleteProductCategory = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(categories).where(eq(categories.id, parsedInput.id));

      revalidateTag("featured_product_categories");
      revalidateTag("featured_categories");
      revalidateTag("active_product_categories");
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

const createProductCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  isFeatured: z.boolean().default(false),
  imageUrl: z.string().optional(),
  cloudId: z.string().optional(),
  mainCategoryId: z.string().min(1, "Main category is required"),
});

export const createProductCategory = actionClient
  .schema(createProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Generate slug from name
      const slug = slugify(parsedInput.name, { lower: true });

      // Check if slug already exists
      const existingCategory = await ctx.db.query.categories.findFirst({
        where: and(
          eq(categories.slug, slug),
          eq(categories.mainCategoryId, parsedInput.mainCategoryId)
        ),
      });

      if (existingCategory) {
        return {
          success: false,
          error: "A category with this name already exists",
        };
      }

      const result = await ctx.db
        .insert(categories)
        .values({
          slug,
          name: parsedInput.name,
          mainCategoryId: parsedInput.mainCategoryId,
          isFeatured: parsedInput.isFeatured,
          image: parsedInput.imageUrl || "",
        })
        .returning({ id: categories.id });

      revalidateTag("categories");
      revalidateTag("featured_product_categories");
      revalidateTag("featured_categories");
      revalidateTag("active_product_categories");
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
