"use client"
import { Calendar, Mail, MoreVertical, UserCheck, UserX } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn, formatDate } from "@/lib/utils"

const avatarColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
]

function getFirstLetters(text: string) {
    return text.slice(0, 2).toUpperCase()
}

type User = {
    name: string;
    email: string;
    createdAt: Date;
    bookName: string | null;
    isActive: boolean | null;
};

export default function Users({ users }: { users: User[] }) {
    return (
        <div className="flex-1 flex flex-col h-full overflow-auto p-6 bg-[#eaeef4]">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Gerenciar Usuarios</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Visualize e gerencie os usuarios do sistema
                </p>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Usuario
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Data Cadastro
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Emprestimo
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Status
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Ações
                            </th>   
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => {
                    
                                return (
                                    <tr
                                        key={index}
                                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className={
                                                    cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm",
                                                    avatarColors[index % avatarColors.length]
                                                )}>
                                                    {getFirstLetters(user.name)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {user.name}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Mail className="w-3.5 h-3.5" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-sm text-foreground">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-600 text-sm">
                                                {user.bookName ?? "Sem Emprestimo"}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={
                                                    cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                                                    user.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200"
                                                )}
                                            >
                                                {user.isActive ? (
                                                    <UserCheck className="w-3.5 h-3.5" />
                                                ) : (
                                                    <UserX className="w-3.5 h-3.5" />
                                                )}
                                                {user.isActive ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant={"ghost"} size={"icon"}>
                                                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-42 p-2">
                                                    {user.isActive ? (
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => {}}
                                                        >
                                                            <UserX className="w-4 h-4 mr-2" />
                                                            Desativar
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50"
                                                            onClick={() => {}}
                                                        >
                                                            <UserCheck className="w-4 h-4 mr-2" />
                                                            Ativar
                                                        </Button>
                                                    )}
                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-12 text-center">
                                    <p className="text-muted-foreground">
                                        Nenhum emprestimo encontrado.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}