import { AppError } from "@/common/errors";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError(e) {

        if (e instanceof AppError) {
            return e.message;
        }

        return "Ocorreu um erro interno."
    },
});