import { AppError } from "@/common/errors";
import { db } from "@/database/db";
import { users } from "@/database/schemas/users.schema";
import { eq } from "drizzle-orm";

export async function getUserById(id: number) {

    const [ user ] = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!user) throw new AppError("Usuario não encontrado!");

    return user;
}