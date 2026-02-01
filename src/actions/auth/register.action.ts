"use server";

import z from "zod";
import { actionClient } from "../safe-action";
import { db } from "@/database/db";
import { users } from "@/database/schemas/users.schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/bcrypt";
import { AppError } from "@/common/errors";

const RegisterSchema = z.object({
    name: z.string().min(3, "O nome precisa pussuir ao menos 3 digitos"),   
    email: z.email("Email invalido!").trim().lowercase(),
    password: z.string().min(8, "A senha precisa possuir ao menos 8 digitos"),
    confirmPassword: z.string()
});

export const register = actionClient.inputSchema(RegisterSchema).action(async({ parsedInput: { name, email, password, confirmPassword } }) => {

    if (password !== confirmPassword) throw new AppError("As senhas não coincidem")

    const [ user ] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user) throw new AppError("Email em uso!");

    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({ name, email, passwordHash: hashedPassword });

    return { success: true }
})