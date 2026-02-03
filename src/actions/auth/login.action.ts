"use server"

import z from "zod"
import { actionClient } from "../safe-action";
import { db } from "@/database/db";
import { users } from "@/database/schemas/users.schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/bcrypt";
import { sign } from "@/lib/auth";
import { AppError } from "@/common/errors";
import { redirect } from "next/navigation";
import { setToken } from "@/lib/cookie";

const LoginSchema = z.object({
	email: z.email({ error: "Email invalido!" }).trim().lowercase(),
	password: z.string().min(8, { error: "A senha precisa possuir ao menos 8 digitos"})
});

export const login = actionClient
	.inputSchema(LoginSchema)
	.action(async({ parsedInput: { email, password } }) => {

		const [ user ] = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (!user) throw new AppError("Email não cadastrado!");

		if (!user.isActive) {
			throw new AppError("Conta inativa!");
		}

		const passwordMatches = await verifyPassword(password, user.passwordHash);
		if (!passwordMatches) throw new AppError("Senha invalida!");

		const tokenJWT = await sign({
			userId: user.id,
			role: user.role,
			email: user.email
		});

		await setToken(tokenJWT);

		redirect("/app/discover")
	}
)

