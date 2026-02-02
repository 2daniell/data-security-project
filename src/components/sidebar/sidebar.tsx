import { BookMarked, Home, Library, Users } from "lucide-react"
import { SidebarLink } from "./sidebar-link";
import { LogoutButton } from "../logout/logout-button";

const navItems = [
    { icon: Home, label: "Explorar", route: "/app/discover" },
    { icon: BookMarked, label: "Emprestimos", route: "/app/loans" },
    { icon: Library, label: "Livros", route: "/app/admin/books", adminOnly: true },
    { icon: Users, label: "Usuarios", route: "/app/admin/users", adminOnly: true },
]

export async function Sidebar({ isAdmin }: { isAdmin: boolean }) {
    return (
        <aside className="w-[200px] bg-card h-screen flex flex-col pt-6 px-4 pb-1 border-r border-border">

            <div className="flex items-center gap-2 mb-8">
                <div className="relative">
                    <Library className="h-8 w-8 text-primary" />
                </div>
                <span className="text-2xl font-bold text-primary">
                    BiblioTech
                </span>
            </div>

            <nav className="flex-1">
                <ul className="space-y-3">
                    {navItems.map((item) => {

                        if (item.adminOnly && !isAdmin) return null;

                        return (
                            <li key={item.label}>
                                <SidebarLink href={item.route}>
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </SidebarLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <LogoutButton />
        </aside>
    )
}