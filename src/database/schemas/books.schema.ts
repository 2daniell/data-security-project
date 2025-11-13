import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { loans } from "./loan.schema";

export const books = pgTable("books", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255}).notNull(),
    category:varchar("category", { length: 255}).notNull(),
    totalCopies: integer("total_copies").notNull().default(1),
    availableCopies: integer("available_copies").notNull().default(1),
    isActive: boolean("is_active").default(true)
})

export const booksRelations = relations(books, ({ many }) => ({
    loans: many(loans)
}));