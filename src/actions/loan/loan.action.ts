"use server"
import { getLastLoan, getLoanStatus, hasActiveLoan } from "@/helper/loan.helper";
import { authActionClient } from "../safe-action";
import { AppError } from "@/common/errors";
import z from "zod";
import { getBook } from "@/helper/book.helper";
import { db } from "@/database/db";
import { loans } from "@/database/schemas/loan.schema";
import { books } from "@/database/schemas/books.schema";
import { eq, sql } from "drizzle-orm";
import { createSystemLog } from "@/helper/logs.helper";
import { revalidatePath } from "next/cache";

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
    console.log(lastLoan)
    if (lastLoan && lastLoan.bookId == bookId) {
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

    await createSystemLog({
        level: "info",
        message: `Emprestimo realizado com sucesso | userId=${userId} | bookId=${bookId}`,
    });

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

const ReturnLoanSchema = z.object({
    loanId: z.number().int().positive(),
});

export const returnLoanAction = authActionClient.inputSchema(ReturnLoanSchema).action(async ({ ctx: { userId}, parsedInput: { loanId } }) => {

    const [loan] = await db
    .select({
    id: loans.id,
    bookId: loans.bookId,
    returnDate: loans.returnDate,
    })
    .from(loans)
    .where(eq(loans.id, loanId))
    .limit(1);

    if (!loan) {
        throw new AppError("Empréstimo não encontrado.");
    }

    if (loan.returnDate) {
        throw new AppError("Este empréstimo já foi devolvido.");
    }

    
    await db.transaction(async (tx) => {
        
        await tx
        .update(loans)
        .set({
            returnDate: new Date(),
        })
        .where(eq(loans.id, loanId));

        await tx
        .update(books)
        .set({
            availableCopies: sql`${books.availableCopies} + 1`  
        })
        .where(eq(books.id, loan.bookId));
    });

    await createSystemLog({
        level: "info",
        message: `Livro devolvido com sucesso | loanId=${loanId} | bookId=${loan.bookId} | userId=${userId}`,
    });

    revalidatePath("/app/loans")

    return { sucess: true, message: "Emprestimo devolvido com sucesso!" }
});