import { safeAction } from "./safe-action";
import { db } from "@/database/db";
import { books } from "@/database/schemas/books.schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Schema de validação para criar/editar livro
const bookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(255),
  author: z.string().min(1, "Autor é obrigatório").max(255),
  category: z.string().min(1, "Categoria é obrigatória").max(255),
  totalCopies: z.number().min(1, "Total de cópias deve ser pelo menos 1"),
  availableCopies: z.number().min(0, "Cópias disponíveis não pode ser negativo"),
});

// Listar todos os livros
export const listBooks = safeAction.action(async () => {
  try {
    const allBooks = await db.query.books.findMany();
    return { success: true, data: allBooks };
  } catch (error) {
    return { success: false, error: "Erro ao listar livros" };
  }
});

// Criar novo livro
export const createBook = safeAction
  .schema(bookSchema)
  .action(async ({ parsedInput }) => {
    try {
      const newBook = await db
        .insert(books)
        .values({
          title: parsedInput.title,
          author: parsedInput.author,
          category: parsedInput.category,
          totalCopies: parsedInput.totalCopies,
          availableCopies: parsedInput.availableCopies,
          isActive: true,
        })
        .returning();

      return { success: true, data: newBook[0] };
    } catch (error) {
      return { success: false, error: "Erro ao criar livro" };
    }
  });

// Atualizar livro
export const updateBook = safeAction
  .schema(
    z.object({
      id: z.number(),
      ...bookSchema.shape,
    })
  )
  .action(async ({ parsedInput }) => {
    try {
      const updatedBook = await db
        .update(books)
        .set({
          title: parsedInput.title,
          author: parsedInput.author,
          category: parsedInput.category,
          totalCopies: parsedInput.totalCopies,
          availableCopies: parsedInput.availableCopies,
        })
        .where(eq(books.id, parsedInput.id))
        .returning();

      return { success: true, data: updatedBook[0] };
    } catch (error) {
      return { success: false, error: "Erro ao atualizar livro" };
    }
  });

// Deletar livro
export const deleteBook = safeAction
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    try {
      await db.delete(books).where(eq(books.id, parsedInput.id));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Erro ao deletar livro" };
    }
  });

// Desativar livro
export const deactivateBook = safeAction
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    try {
      const deactivatedBook = await db
        .update(books)
        .set({ isActive: false })
        .where(eq(books.id, parsedInput.id))
        .returning();

      return { success: true, data: deactivatedBook[0] };
    } catch (error) {
      return { success: false, error: "Erro ao desativar livro" };
    }
  });
