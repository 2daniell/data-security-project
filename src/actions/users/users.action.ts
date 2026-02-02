"use server"
import { db } from "@/database/db";
import { adminActionClient } from "../safe-action";
import { users } from "@/database/schemas/users.schema";
import { loans } from "@/database/schemas/loan.schema";
import { books } from "@/database/schemas/books.schema";
import { eq } from "drizzle-orm";

export const getUsers = adminActionClient.action(async() => {

    console.log("OIII")

    const result = await db.select({
        name: users.name,
        email: users.email,
        createdAt: users.createAt,
        bookName: books.title,
        isActive: users.isActive,
    })
    .from(users)
    .where(eq(users.role, "default"))
    .leftJoin(loans, eq(loans.userId, users.id))
    .leftJoin(books, eq(books.id, loans.bookId))

    return result;
})