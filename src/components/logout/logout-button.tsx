"use client"
import { LogOut } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { logout } from "@/actions/auth/logout.action"

export function LogoutButton() {
    const { execute, status } = useAction(logout);

    return (
        <button 
            onClick={() => execute()} 
            disabled={status === "executing"} 
            className="cursor-pointer w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50"
        >
            <LogOut className="mr-3 w-5 h-5" />
            Sair
        </button>
    )
}