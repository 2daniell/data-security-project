"use server";

import { createSafeActionClient } from "next-safe-action";
import { signupSchema } from "@/lib/validators/auth";
import { db } from "@/database/db";
import { users } from "@/database/schemas/users.schema";
import { hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function signupAction(formData: FormData) {
  const data = Object.fromEntries(formData);

  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    return { error: { email: ["Usuário já existe"] } };
  }

  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  });

  return { success: true };
}
