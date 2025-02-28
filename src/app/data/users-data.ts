"use server";
import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { users } from "@/db/schema";
import { and, count, gte, or, sql } from "drizzle-orm";
import { cache } from "react";
export const getUsers = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredUsers = db.$with("filtered_users").as(
      db
        .select()
        .from(users)
        .where(
          and(
            q
              ? or(
                  sql`${users.name} LIKE ${`%${q}%`}`,
                  sql`${users.email} LIKE ${`%${q}%`}`
                )
              : undefined
          )
        )
    );

    const result = await db
      .with(filteredUsers)
      .select()
      .from(filteredUsers)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    // Get total user count after filters
    const c = await getUsersCount({ q });
    const pageCount = Math.ceil(c / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, count: c, pageCount };
  }
);
export const getUsersCount = cache(async ({ q }: { q?: string }) => {
  const filteredUsers = db.$with("filtered_users").as(
    db
      .select()
      .from(users)
      .where(
        and(
          q
            ? or(
                sql`${users.name} LIKE ${`%${q}%`}`,
                sql`${users.email} LIKE ${`%${q}%`}`
              )
            : undefined
        )
      )
  );

  const [result] = await db
    .with(filteredUsers)
    .select({ count: count() })
    .from(filteredUsers);

  return result.count;
});

export const getUserCountToday = cache(async () => {
  const [result] = await db
    .select({ count: count() })
    .from(users)
    .where(gte(users.createdAt, new Date()));
  return result.count;
});

export const getTotalUsersCount = cache(async () => {
  const result = await db.select({ count: count() }).from(users);
  const c = result[0];
  return c.count;
});
export const getTotalUsersCountToDay = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); //
  const result = await db
    .select({ count: count() })
    .from(users)
    .where(sql`DATE(created_at) = ${today.toISOString().split("T")[0]}`);
  const c = result[0];
  return c.count;
});
