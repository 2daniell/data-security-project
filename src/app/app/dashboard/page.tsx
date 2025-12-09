"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Clock, Star, Plus, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    label: "Livros Emprestados no Ano",
    value: "32",
    icon: BookOpen,
  },
  {
    label: "Empréstimos Ativos",
    value: "3",
    icon: TrendingUp,
  },
  {
    label: "Páginas Registradas",
    value: "1.240",
    icon: Clock,
  },
  {
    label: "Avaliação Média",
    value: "4.6",
    icon: Star,
  },
]

const recentBooks = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    pages: "328 páginas",
    loanStartDate: new Date("2025-12-01"),
    loanEndDate: new Date("2025-12-20"),
  },
  {
    id: 2,
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    pages: "576 páginas",
    loanStartDate: new Date("2025-11-25"),
    loanEndDate: new Date("2025-11-25"),
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    pages: "464 páginas",
    loanStartDate: new Date("2025-10-01"),
    loanEndDate: new Date("2025-11-01"),
  },
]

const recentActivity = [
    { id: 1, action: "Devolveu", book: "Sapiens", time: "2 horas atrás", type: "complete" },
    { id: 2, action: "Pegou emprestado", book: "O Hobbit", time: "5 horas atrás", type: "add" },
    { id: 3, action: "Avaliou com 5 estrelas", book: "1984", time: "1 dia atrás", type: "rating" },
    { id: 4, action: "Renovou o empréstimo de", book: "O Senhor dos Anéis", time: "2 dias atrás", type: "start" },
]

function getLoanProgress(book: { loanStartDate: Date; loanEndDate: Date }) {
    const now = new Date()
    const total = book.loanEndDate.getTime() - book.loanStartDate.getTime()
    const elapsed = now.getTime() - book.loanStartDate.getTime()
    return Math.min(Math.max(Math.round((elapsed / total) * 100), 0), 100)
}

function getDueText(book: { loanEndDate: Date }) {
    const now = new Date()
    const diffTime = book.loanEndDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return "Devolvido"
    if (diffDays === 0) return "Hoje"
    return `${diffDays} dias restantes`
}

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6 lg:p-8 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
                <h1 className="text-4xl font-bold mb-2 text-balance">Olá, leitor</h1>
                <p className="text-muted-foreground text-lg">Gerencie seus empréstimos e acompanhe sua atividade</p>
            </div>
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="#">
                    <Plus className="h-4 w-4 mr-2" />
                    Buscar Livros para Empréstimo
                </Link>
            </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                    <Card key={stat.label} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-4 w-4 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Empréstimos Ativos</CardTitle>
                            <CardDescription className="mt-1">Livros atualmente com você</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {recentBooks.filter((b) => getLoanProgress(b) < 100).length} ativos
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {recentBooks.map((book) => {
                            const progress = getLoanProgress(book)
                            const dueText = getDueText(book)
                            return (
                                <div
                                    key={book.id}
                                    className="group flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="relative">
                                    <img
                                        src={"/placeholder.svg"}
                                        alt={book.title}
                                        className="w-16 h-24 rounded-md object-cover border-2 border-border shadow-sm group-hover:shadow-md transition-shadow"
                                    />

                                    {progress >= 100 && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <Sparkles className="w-3 h-3 text-primary-foreground" />
                                        </div>
                                    )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{book.title}</h3>
                                            <p className="text-sm text-muted-foreground">{book.author}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{book.pages}</p>
                                            <p className="text-xs text-primary font-medium mt-1">{dueText}</p>
                                        </div>
                                        <Progress
                                            value={progress}
                                            className={`h-2 ${progress >= 100 ? "bg-red-200" : progress > 50 ? "bg-green-200" : "bg-yellow-200"}`}
                                        />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    <Button variant="outline" className="w-full mt-6 group bg-transparent" asChild>
                        <Link href="#">
                            Ver Todos os Empréstimos
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Atividade Recente</CardTitle>
                    <CardDescription className="mt-1">Últimas ações nos empréstimos</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mt-2 ${
                                    activity.type === "complete"
                                        ? "bg-green-500"
                                        : activity.type === "rating"
                                        ? "bg-yellow-500"
                                        : "bg-primary"
                                    }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm leading-relaxed">
                                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                                        <span className="font-semibold text-foreground">{activity.book}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6 group bg-transparent" asChild>
                        <Link href="/logs">
                            Ver Histórico Completo
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <Card className="bg-linear-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 shadow-lg">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-2xl">Resumo de Empréstimos</CardTitle>
                        <CardDescription className="mt-2 text-base">
                            Você devolveu <strong>28 livros</strong> este ano. Continue assim!
                        </CardDescription>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">3 <span className="text-xl text-muted-foreground">ativos</span></span>
                    <Badge variant="secondary" className="bg-primary text-primary-foreground px-3 py-1">
                        0 atrasados
                    </Badge>
                </div>
                    <Progress value={100} className="h-3" />
                </div>
                <div className="pt-2 flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-muted-foreground">
                        Em média você fica <span className="font-semibold text-foreground">12 dias</span> com cada livro
                    </p>
                </div>
            </CardContent>
      </Card>
    </div>
  )
}
