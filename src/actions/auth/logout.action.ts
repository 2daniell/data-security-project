"use server"
import { deleteToken } from "@/lib/cookie";
import { actionClient } from "../safe-action";
import { redirect } from "next/navigation";

export const logout = actionClient.action(async() =>  {
    await deleteToken();
    redirect("/");
})