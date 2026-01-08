import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
