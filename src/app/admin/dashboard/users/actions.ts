"use server";
import { users, insertUserSchema } from "@/db/schema";
import { hashPassword } from "@/lib/passwords";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createUser = actionClient
  .schema(insertUserSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const hashed = await hashPassword(parsedInput.password);
      await ctx.db.insert(users).values({
        ...parsedInput,
        password: hashed,
        role: "admin",
      });
    } catch (err) {
      console.error(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/users");
    return {
      success: true,
    };
  });

export const deleteUser = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      if (ctx.user.id == parsedInput.id) return { success: false };
      await ctx.db.delete(users).where(and(eq(users.id, parsedInput.id)));
    } catch (err) {
      console.error(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/users");
    return { success: true };
  });
