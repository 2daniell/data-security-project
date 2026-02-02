import { createSafeActionClient } from "next-safe-action";
import { redirect } from "next/navigation";
import { AppError } from "@/common/errors";
import { getToken } from "@/lib/cookie";
import { verify } from "@/lib/auth";

export const actionClient = createSafeActionClient({
    handleServerError(e) {
        if (e instanceof AppError) {
            //if (e.redirect) return redirect("/unauthorized");

            return e.message;
        }

        return "Ocorreu um erro interno.";
    },
});

export const authActionClient = actionClient.use(async ({ next }) => {
    const token = await getToken();

    if (!token) {
        throw new AppError("Invalid Token", true);
    }

    const payload = await verify(token).catch(() => {
        throw new AppError("Invalid Token", true);
    });

    return next({
        ctx: {
            userId: payload.userId as number,
            role: payload.role as string
        },
    });
});

export const adminActionClient = authActionClient.use(async ({ ctx, next }) => {
    if (ctx.role !== "admin") {
        throw new AppError("Unauthorized", true);
    }

    return next();
  }
);
