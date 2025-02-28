import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth";
import { db } from "@/db";
export const actionClient = createSafeActionClient().use(async ({ next }) => {
  return next({ ctx: { db } });
});

export const protectedActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized user");

  return next({ ctx: { user: session.user } });
});
