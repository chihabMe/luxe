"use server";
import {
  categories,
  mainCategories,
  productImages,
  products,
  productSpecifications,
  specificationValues,
} from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import slugify from "slugify";

// For update product action
const updateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  mark: z.string().min(2, "mark must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  isFeatured: z.boolean().default(false),
  category: z.string().optional(),
  mainCategory: z.string().optional(),
  imageUrls: z.array(z.string()),
  cloudIds: z.array(z.string()),
  specifications: z.array(
    z.object({
      name: z.string().min(1),
      values: z.array(z.string().min(1)),
    })
  ),
});

export const updateProduct = protectedActionClient
  .schema(updateProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const sluggedCategory = slugify(parsedInput.category || "");
      const sluggedMainCategory = slugify(parsedInput.mainCategory || "");

      const foundCategory = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, sluggedCategory),
      });
      const foundMainCategory = await ctx.db.query.mainCategories.findFirst({
        where: eq(mainCategories.slug, sluggedMainCategory),
      });
      const markSlug = parsedInput.mark
        ? slugify(parsedInput.mark, {
            lower: true,
            strict: true,
            locale: "fr",
          })
        : undefined;

      const result = await ctx.db.transaction(async (tx) => {
        await tx
          .update(products)
          .set({
            name: parsedInput.name,
            description: parsedInput.description,
            mark: parsedInput.mark,
            markSlug,
            isFeatured: parsedInput.isFeatured,
            categoryId: foundCategory?.id,
            mainCategoryId: foundMainCategory?.id,
          })
          .where(eq(products.id, parsedInput.id));

        await tx
          .delete(productImages)
          .where(eq(productImages.productId, parsedInput.id));

        if (parsedInput.imageUrls.length > 0) {
          const imageRecords = parsedInput.imageUrls.map((url, index) => ({
            productId: parsedInput.id,
            url: url,
            cloudId: parsedInput.cloudIds[index],
          }));

          await tx.insert(productImages).values(imageRecords);
        }

        await tx
          .delete(productSpecifications)
          .where(eq(productSpecifications.productId, parsedInput.id));

        if (parsedInput.specifications.length > 0) {
          await Promise.all(
            parsedInput.specifications.map(async (specification) => {
              const insertedSpec = await tx
                .insert(productSpecifications)
                .values({
                  name: specification.name,
                  productId: parsedInput.id,
                })
                .returning({ id: productSpecifications.id })
                .then((res) => res[0]);
              await Promise.all(
                specification.values.map((value) => {
                  return tx.insert(specificationValues).values({
                    specificationId: insertedSpec.id,
                    value,
                  });
                })
              );
            })
          );
        }

        return true;
      });

      revalidateTag("featured_products");
      revalidateTag("category_products");
      revalidateTag("latest_products");
      revalidateTag("products");
      revalidateTag("carousel_products");
      revalidatePath("/admin/dashboard/products");
      revalidatePath("/");

      return { success: true, data: result };
    } catch (err) {
      console.error("Error updating product:", err);
      return { success: false };
    }
  });

// Creating a new product
const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  mark: z.string().min(2, "mark must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  isFeatured: z.boolean().default(false),
  category: z.string({ required_error: "Please select a category." }),
  mainCategory: z.string({ required_error: "Please select a main  category." }),
  imageUrls: z.array(z.string()),
  cloudIds: z.array(z.string()),
  specifications: z.array(
    z.object({
      name: z.string().min(1),
      values: z.array(z.string().min(1)),
    })
  ),
});

export const createProduct = actionClient
  .schema(createProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const slug = slugify(parsedInput.name, {
        lower: true,
        strict: true,
        locale: "fr",
      });
      const markSlug = slugify(parsedInput.mark, {
        lower: true,
        strict: true,
        locale: "fr",
      });
      const sluggedCategory = slugify(parsedInput.category);
      const sluggedMainCategory = slugify(parsedInput.mainCategory);

      const foundCategory = await ctx.db.query.categories.findFirst({
        where: eq(categories.slug, sluggedCategory),
      });
      const foundMainCategory = await ctx.db.query.mainCategories.findFirst({
        where: eq(mainCategories.slug, sluggedMainCategory),
      });

      if (!foundCategory || !foundMainCategory) return { success: false };

      const [newProduct] = await ctx.db
        .insert(products)
        .values({
          description: parsedInput.description,
          slug,
          name: parsedInput.name,
          mark: parsedInput.mark,
          isFeatured: parsedInput.isFeatured,
          categoryId: foundCategory.id,
          mainCategoryId: foundMainCategory.id,
          markSlug,
        })
        .returning({ id: products.id });

      // Handle image uploads
      await Promise.all(
        parsedInput.imageUrls.map((url: string, index: number) => {
          return ctx.db.insert(productImages).values({
            productId: newProduct.id,
            cloudId: parsedInput.cloudIds[index],
            url: url,
          });
        })
      );

      // Handle features
      await Promise.all(
        parsedInput.specifications.map(async (specification) => {
          const insertedSpec = await ctx.db
            .insert(productSpecifications)
            .values({
              name: specification.name,
              productId: newProduct.id,
            })
            .returning({ id: productSpecifications.id })
            .then((res) => res[0]);
          await Promise.all(
            specification.values.map((value) => {
              return ctx.db.insert(specificationValues).values({
                specificationId: insertedSpec.id,
                value,
              });
            })
          );
        })
      );

      revalidateTag("featured_products");
      revalidateTag("category_products");
      revalidateTag("latest_products");
      revalidateTag("products");
      revalidateTag("carousel_products");
      revalidatePath("/admin/dashboard/products");
      revalidatePath("/");

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  });

export const deleteProduct = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(products).where(eq(products.id, parsedInput.id));
    } catch (err) {
      console.error(err);
      return { success: false };
    }

    revalidateTag("featured_products");
    revalidateTag("category_products");
    revalidateTag("latest_products");
    revalidateTag("products");
    revalidateTag("carousel_products");
    revalidatePath("/admin/dashboard/products");
    revalidatePath("/");
    return { success: true };
  });
