import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { books } from "./books.schema";
import { relations } from "drizzle-orm";

export const loans = pgTable("loans", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    bookId: integer("book_id").references(() => books.id).notNull(),
    loanDate: timestamp("loan_date").defaultNow().notNull(),
    dueDate: timestamp("due_date").notNull(),
    returnDate: timestamp("return_date"),
})

export const loansRelations = relations(loans, ({ one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [loans.bookId],
    references: [books.id],
  }),
}));