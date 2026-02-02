"use client"
import { useUser } from "@/context/UserProvider"
import { Bell, User } from "lucide-react"

export function Header() {

    const user = useUser();

    return (
        <header className="h-16 flex items-center justify-end-safe px-6 bg-card border-b border-border">
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] text-primary-foreground rounded-full flex items-center justify-center font-medium">
                        0
                    </span>
                </button>

                <div className="flex items-center gap-2 py-1.5 rounded-lg">
                    <div className="h-8 w-8 bg-primary rounded-full flex justify-center items-center">
                        <User className="text-white" />
                    </div>
                    <span className="font-medium text-sm text-foreground">{user.name}</span>
                </div>
            </div>
        </header>
    )
}
