"use server"

import z from "zod";
import { adminActionClient, authActionClient } from "../safe-action";
import { books } from "@/database/schemas/books.schema";
import { db } from "@/database/db";
import { eq } from "drizzle-orm";
import { createSystemLog } from "@/helper/logs.helper";
import { revalidatePath } from "next/cache";

const CreateBookSchema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    category: z.string().min(1),
    totalCopies: z.number().int().positive().optional()
});

export const createBook = adminActionClient.inputSchema(CreateBookSchema).action(async ({ ctx: { userId }, parsedInput: { author, category, title, totalCopies } }) => {

    const [book] = await db.insert(books)
        .values({
            title,
            author,
            category,
            totalCopies,
            availableCopies: totalCopies,
            isActive: true,
        }).returning();

    await createSystemLog({
        level: "info",
        message: `Novo livro registrado | bookId=${book.id} | userId=${userId}`,
    });

    revalidatePath("/app/admin/books")

    return { book };
});

const DeleteBookSchema = z.object({
    bookId: z.number()
});

export const deleteBook = adminActionClient.inputSchema(DeleteBookSchema).action(async ({ ctx: { userId }, parsedInput: { bookId } }) => {
    await db.delete(books).where(eq(books.id, bookId));

    await createSystemLog({
        level: "info",
        message: `Livro deletado | bookId=${bookId} | userId=${userId}`,
    });

    revalidatePath("/app/admin/books")
});

export const getAllBooks = authActionClient.action(async() => {

    const result = await db.select({
        id: books.id,
        title: books.title,
        author: books.author,
        category: books.category,
        totalCopies: books.totalCopies,
        availableCopies: books.availableCopies
    }).from(books);
        
    return result;
})