import { db } from "@/database/db";
import { books } from "@/database/schemas/books.schema";
import { eq } from "drizzle-orm";

export async function getBook(bookId: number) {
    const result = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
    return result[0] ?? null;
}