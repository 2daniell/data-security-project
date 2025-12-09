"use client"
import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { Library, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
    const router = useRouter();
    const [ isLoading, setLoading ] = useState<boolean>(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setLoading(false);
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Carregando...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            
            <header className="lg:hidden border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                        <Library className="h-8 w-8 text-primary" />
                        <span className="text-lg font-bold">BiblioTech</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="hover:bg-secondary"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                
            </header>

            <div className="lg:flex">
                <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border bg-gradient-to-b from-secondary/30 to-background shadow-sm">
                    <Sidebar />
                    {/* <UserProfile /> */}
                </aside>

                <main className="lg:pl-64 flex-1 min-h-screen">{children}</main>
            </div>
        </div>
    );
}
