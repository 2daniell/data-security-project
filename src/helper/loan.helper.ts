import { db } from "@/database/db";
import { loans } from "@/database/schemas/loan.schema";
import { and, desc, eq, isNull } from "drizzle-orm";

export async function hasActiveLoan(userId: number): Promise<boolean> {
    const reuslt = await db.select({ id: loans.id }).from(loans).where(and(eq(loans.userId, userId), isNull(loans.returnDate))).limit(1);
    return reuslt.length >= 1;
}

export async function getLastLoan(userId: number) {
    const result = await db.select().from(loans).where(eq(loans.userId, userId)).orderBy(desc(loans.loanDate)).limit(1);
    return result[0] ?? null;
}

export function getLoanStatus(params: { dueDate: Date, returnDate?: Date | null }) {
    if (params.returnDate) {
        return "returned";
    }

    const now = new Date();

    if (params.dueDate < now) {
        return "overdue";
    }

    return "active";
}