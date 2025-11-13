import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as systemLogSchema from "./schemas/log.schema"
import * as userSchema from "./schemas/users.schema"
import * as loanSchema from "./schemas/loan.schema"
import * as bookSchema from "./schemas/books.schema"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!
});

export const db = drizzle(pool, { 
    schema: {
        ...systemLogSchema,
        ...userSchema,
        ...loanSchema,
        ...bookSchema
    }
 })