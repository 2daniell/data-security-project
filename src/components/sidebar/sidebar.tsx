"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Library, Home, BookOpen, Activity, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Catálogo", href: "/", icon: BookOpen },
  { name: "Historico", href: "/", icon: Activity },
  { name: "Configurações", href: "/", icon: Settings },
]

interface SidebarProps {
  onItemClick?: () => void
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
        <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
            <Library className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BiblioTech</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

            return (
                <Link
                    key={item.name}
                    href={"#"}
                    onClick={onItemClick}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                        isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
                    )}>
                    <Icon className="h-5 w-5" />
                    {item.name}
                </Link>
                )
            })}
        </nav>
    </>
  )
}
