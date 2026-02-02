"use client"
import { createContext, useContext } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: "default" | "admin";
    createAt: Date;
}

const UserContext = createContext<User | null>(null);

export function UserProvider({ user, children }: { user: User, children: React.ReactNode }) {
    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )
}

export function useUser() {
    const user = useContext(UserContext);
    if (!user) throw new Error("useUser precisa ser usado dentro de um UserProvider");
    return user;
}
