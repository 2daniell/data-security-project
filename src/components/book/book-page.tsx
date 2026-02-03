"use client"
import { MoreVertical, Plus, UserX, X } from "lucide-react"
import { BookCover } from "./book"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import { createBook, deleteBook } from "@/actions/book/book.action"
import { useAction } from "next-safe-action/hooks"

type Book = {
    id: number
    title: string
    author: string
    category: string
    totalCopies: number
    availableCopies: number
}

export default function Books({ books }: { books: Book[] }) {

    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        copies: "",
    })


    const { execute: executeCreate } = useAction(createBook, {
        onSuccess: () => {
            setModalOpen(false)
            setFormData({
            title: "",
            author: "",
            category: "",
            copies: "",
            })
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        executeCreate({
            title: formData.title,
            author: formData.author,
            category: formData.category,
            totalCopies: Number(formData.copies),
        })
    }


    return (
        <div className="flex-1 flex flex-col h-full overflow-auto p-6 bg-[#eaeef4]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Gerenciar Livros</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Visualize e gerencie os Livros do sistema
                    </p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Novo Livro
                </button>   
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div
                            key={book.id}
                            className={cn(
                                "bg-card rounded-xl border border-border p-4 transition-all"
                            )}
                        >
                            <div className="flex gap-4">
                                <div className="w-20 h-28 rounded-lg overflow-hidden shrink-0">
                                    <BookCover
                                        title={book.title}
                                        author={book.author}
                                        colorIndex={book.id}
                                    />
                                </div>
                    
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-foreground truncate">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {book.author}
                                            </p>
                                        </div>
                                        <div className="relative shrink-0">
                                            <Popover open={openPopoverId === book.id} onOpenChange={(open) => setOpenPopoverId(open ? book.id : null)}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                                                    >
                                                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                                                    </Button>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-42 p-2">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={async () => {
                                                            await deleteBook({ bookId: book.id })
                                                            setOpenPopoverId(null)
                                                        }}
                                                    >
                                                        <UserX className="w-4 h-4 mr-2" />
                                                        Deletar
                                                    </Button>
                                                </PopoverContent>
                                            </Popover>
                                        </div>  
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="px-2 py-0.5 bg-secondary text-xs font-medium text-muted-foreground rounded-full">
                                            {book.category}
                                        </span>
                                        <span className="px-2 py-0.5 bg-secondary text-xs font-medium text-muted-foreground rounded-full">
                                            100 pag.
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-sm">
                                            <span className="text-foreground font-medium">
                                                {book.availableCopies}
                                            </span>
                                            <span className="text-muted-foreground">
                                                /{book.totalCopies} disponiveis
                                            </span>
                                        </div>
                                        <span
                                            className={cn(
                                            "px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700")} 
                                        >
                                            Ativo
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center">
                        <p className="text-muted-foreground">Nenhum livro encontrado.</p>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-2xl p-6 w-full max-w-lg mx-4 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-foreground">
                                Novo Livro
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">
                                    Titulo
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                                    }
                                    required
                                    className="w-full h-11 px-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Digite o titulo do livro"
                                />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">
                                        Autor
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, author: e.target.value }))
                                        }
                                        required
                                        className="w-full h-11 px-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Digite o nome do autor"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">
                                        Categoria
                                    </label>
                
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, category: e.target.value }))
                                        }
                                        required
                                        className="w-full h-11 px-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Digite o nome do autor"
                                    />
            

                                    <label className="block text-sm font-medium text-foreground mb-1.5">
                                        Numero de Copias
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.copies}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, copies: e.target.value }))
                                        }
                                        required
                                        min="1"
                                        className="w-full h-11 px-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {}}
                                        className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        Cadastrar Livros
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            )}
        </div>
    )
}