import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { loans } from "./loan.schema";

export const userRole = pgEnum("user_role", ["default", "admin"])

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    email: varchar("email", { length: 255}).notNull().unique(), 
    passwordHash: text("password_hash").notNull(),
    role: userRole("role").notNull().default("default"),
    createAt: timestamp("created_at").defaultNow().notNull(),
    isActive: boolean("is_active").default(true)
})

export const usersRelations = relations(users, ({ many }) => ({
    loans: many(loans)
}));