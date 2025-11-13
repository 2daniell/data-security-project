import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const logLevel = pgEnum("log_level", ["info", "warn", "error"])

export const systemLogs = pgTable("system_logs", {
    id: serial("id").primaryKey(),
    level: logLevel("level").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});