import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  })
  .superRefine((data, ctx) => {
    const password = data.password;

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "Senha deve conter pelo menos uma letra maiúscula",
      });
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "Senha deve conter pelo menos uma letra minúscula",
      });
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "Senha deve conter pelo menos um número",
      });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "Senha deve conter pelo menos um caractere especial",
      });
    }
  });

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
