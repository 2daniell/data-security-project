import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookMarked, BookOpen, Library, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {

    return (
        <div className="min-h-screen bg-background">
            <header className="">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Library className="h-8 w-8 text-primary" />
                            </div>
                            <span className="text-2xl font-bold text-primary">
                                BiblioTech
                            </span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="#"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                Recursos
                            </Link>

                            <Link
                                href="#"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                Como Funciona
                            </Link>

                            <Link
                                href="#"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                Explorar
                            </Link>
                        </nav>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" className="font-semibold text-base" asChild>
                            <Link href="/signin">Entrar</Link>
                        </Button>

                        <Button asChild className="font-semibold text-base">
                            <Link href="/signup">
                                Começar Grátis
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
                </div>
            </header>

            <section className="mx-auto pt-20 pb-32 md:pt-32 md:pb-40">
                <div className="flex gap-12 justify-center items-center text-center">
                    <div className="flex items-center justify-center flex-col space-y-8">

                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                            <Sparkles className="h-4 w-4" />+ de 10 mil leitores já estão aqui
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug text-balance">
                            Organize, acompanhe e <br/> controle sua coleção com <br />
                            <span className="relative inline-block">
                                <span className="relative z-10 text-primary">Sua Biblioteca Digital</span>
                                <div className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 -skew-y-1" />
                            </span>
                        </h1>


                        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                            Organize sua coleção, acompanhe seu progresso de leitura e descubra novos títulos. Tudo em um só lugar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild className="text-lg h-14 px-10 group shadow-lg shadow-primary/20">
                            <Link href="/signup">
                                Criar conta grátis
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="text-lg h-14 px-10 bg-transparent">
                            <Link href="/">Explorar catálogo</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-4 max-w-md">
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-foreground">50K+</div>
                                <div className="text-sm text-muted-foreground">Livros</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-foreground">10K+</div>
                                <div className="text-sm text-muted-foreground">Leitores</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-foreground">4.9★</div>
                                <div className="text-sm text-muted-foreground">Nota</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}