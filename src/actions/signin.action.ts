import { createSafeActionClient } from "next-safe-action";
import { signupSchema } from "../lib/validators/auth";
import { db } from "../database/db";
import { users } from "../database/schemas/users.schema";
import { hashPassword } from "../lib/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";

const actionClient = createSafeActionClient();

type SignupInput = z.infer<typeof signupSchema>;

export const signupAction = actionClient.action({
  schema: signupSchema,
  handler: async ({ name, email, password }: SignupInput) => {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await hashPassword(password);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
    });

    return { success: true };
  },
});

