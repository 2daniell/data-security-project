"use server"
import { db } from "@/database/db";
import { adminActionClient } from "../safe-action";
import { users } from "@/database/schemas/users.schema";
import { loans } from "@/database/schemas/loan.schema";
import { books } from "@/database/schemas/books.schema";
import { and, eq, isNull } from "drizzle-orm";
import z from "zod";
import { revalidatePath } from "next/cache";
import { createSystemLog } from "@/helper/logs.helper";

export const getUsers = adminActionClient.action(async() => {

    const result = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createAt,
        bookName: books.title,
        isActive: users.isActive,
    })
    .from(users)
    .where(eq(users.role, "default"))
    .leftJoin(loans, and(
        eq(loans.userId, users.id),
        isNull(loans.returnDate)
    ))
    .leftJoin(books, eq(books.id, loans.bookId))

    return result;
})

const DisableUserAccountSchema = z.object({
    userId: z.number("ID invalido!")
});

export const disableUserAccount = adminActionClient.inputSchema(DisableUserAccountSchema).action(async({ parsedInput: { userId } }) => {

    await db.update(users).set({ isActive: false }).where(eq(users.id, userId));

    await createSystemLog({
        level: "info",
        message: `Conta do usuario foi desativada | userId=${userId}`,
    });

    revalidatePath("/app/admin/users")
})

const EnableUserAccountSchema = z.object({
    userId: z.number("ID invalido!")
});

export const enableUserAccount = adminActionClient.inputSchema(EnableUserAccountSchema).action(async({ parsedInput: { userId } }) => {

    await db.update(users).set({ isActive: true }).where(eq(users.id, userId));

    await createSystemLog({
        level: "info",
        message: `Conta do usuario foi ativada | userId=${userId}`,
    });

    revalidatePath("/app/admin/users")
})