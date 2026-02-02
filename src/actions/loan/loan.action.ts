"use server"
import { getLastLoan, getLoanStatus, hasActiveLoan } from "@/helper/loan.helper";
import { authActionClient } from "../safe-action";
import { AppError } from "@/common/errors";
import z from "zod";
import { getBook } from "@/helper/book.helper";
import { db } from "@/database/db";
import { loans } from "@/database/schemas/loan.schema";
import { books } from "@/database/schemas/books.schema";
import { eq } from "drizzle-orm";

const CreateLoanSchema = z.object({
    bookId: z.number("ID Invalido")
});

const LOAN_DAYS = 15;

export const createLoan = authActionClient.inputSchema(CreateLoanSchema).action(async({ parsedInput: { bookId }, ctx: {  userId } }) => {
    
    const hasLoan = await hasActiveLoan(userId);

    if (hasLoan) {
        throw new AppError("Você já possui um emprestimo ativo");
    }

    const lastLoan = await getLastLoan(userId);
    if (lastLoan && lastLoan.id == bookId) {
        throw new AppError("Você não pode pegar o mesmo livro em sequencia");
    }

    const book = await getBook(bookId);

    if (!book) {
        throw new AppError("Livro não encontrado");
    }

    if (!book.isActive) {
        throw new AppError("O livro está inativo");
    }

    if (book.availableCopies <= 0) {
        throw new AppError("Livro sem estoque disponivel");
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + LOAN_DAYS);

    await db.transaction(async(tx) => {

        await tx.insert(loans).values({ bookId, userId, dueDate })
        await tx.update(books).set({ availableCopies: book.availableCopies - 1 }).where(eq(books.id, bookId));

    })

    return { sucess: true, message: "Emprestimo realizado com sucesso!" }
})

export const getUserLoans = authActionClient.action(async({ ctx: {  userId } }) => {

    const result = await db.select({ 
        id: loans.id,
        bookTitle: books.title,
        bookAuthor: books.author,
        dueDate: loans.dueDate,
        returnDate: loans.returnDate,
        loanDate: loans.loanDate,
    })
    .from(loans)
    .innerJoin(books, eq(loans.bookId, books.id))
    .where(eq(loans.userId, userId));

    const sanitized = result.map((loan) => ({
        ...loan,
        status: getLoanStatus({
            dueDate: loan.dueDate,
            returnDate: loan.returnDate
        }),
    }))

    return sanitized
})