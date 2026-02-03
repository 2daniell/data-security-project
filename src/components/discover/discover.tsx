"use client"
import { useState } from "react";
import { BookCard, BookCover } from "../book/book";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { createLoan } from "@/actions/loan/loan.action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type Book = {
    id: number;
    title: string;
    author: string;
    category: string;
    totalCopies: number;
    availableCopies: number;
}

export default function Discover({ books }: { books: Book[] }) {

    const [selectedBook, setSelectedBook] = useState<Book | null>(
        books.length > 0 ? books[0] : null
    );

    const recommendedBooks = books.slice(0, 4);

    const { execute } = useAction(createLoan, {
        onSuccess: ({ data }) => {
            toast.success(data.message, { position: "top-center" });
        },
        onError: ({ error }) => {
            toast.error(error.serverError, { position: "top-center" });
        }
    });

    const handleCheckoutBook = () => {
        if (!selectedBook) return;
        execute({ bookId: selectedBook.id });
    };

    return (
        <>
            <div className="flex-1 flex flex-col h-full overflow-auto p-6 bg-[#eaeef4]">
                <div className="bg-background rounded-2xl p-3 mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-bold text-foreground">Recomendados</h2>
                    </div>

                    <div className="flex gap-5 flex-wrap">
                        {recommendedBooks.length > 0 ? (
                            recommendedBooks.map((book) => (
                                <BookCard
                                    key={book.id}
                                    title={book.title}
                                    author={book.author}
                                    colorIndex={book.id}
                                    onClick={() => setSelectedBook(book)}
                                />
                            ))
                        ) : (
                            <p className="text-muted-foreground text-sm">Nenhum livro encontrado.</p>
                        )}
                    </div>
                </div>

                <div className="flex-1 bg-background rounded-2xl p-3">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-bold text-foreground">Livros</h2>
                    </div>

                    <div className="flex gap-5 flex-wrap select-none">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    title={book.title}
                                    author={book.author}
                                    colorIndex={book.id}
                                    onClick={() => setSelectedBook(book)}
                                />
                            ))
                        ) : (
                            <p className="text-muted-foreground text-sm">Nenhum livro encontrado.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-[280px] border-l border-border p-6 bg-[#011542]">
                {!selectedBook ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-primary-foreground font-semibold mb-2">
                            Nenhum livro selecionado
                        </p>
                        <p className="text-sm text-muted">
                            Selecione um livro para ver os detalhes
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="relative w-full h-[280px] rounded-2xl overflow-hidden mb-4 shadow-lg">
                            <BookCover
                                title={selectedBook.title}
                                author={selectedBook.author}
                                colorIndex={selectedBook.id}
                            />
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="font-bold text-lg text-primary-foreground mb-1">
                                {selectedBook.title}
                            </h2>
                            <p className="text-sm text-muted mb-2">
                                {selectedBook.author}
                            </p>

                            <div className="flex items-center justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-4 h-4",
                                            i < 4
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-200 text-gray-200"
                                        )}
                                    />
                                ))}
                                <span className="text-sm font-medium text-primary-foreground ml-1">
                                    4
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 py-4 border-y border-border mb-4">
                            <div className="text-center">
                                <p className="font-bold text-primary-foreground">100+</p>
                                <p className="text-xs text-muted">Paginas</p>
                            </div>

                            <div className="text-center border-l border-r border-border px-4">
                                <p className="font-bold text-primary-foreground">100+</p>
                                <p className="text-xs text-muted">Avaliações</p>
                            </div>

                            <div className="text-center">
                                <p className="font-bold text-primary-foreground">100+</p>
                                <p className="text-xs text-muted">Avaliações</p>
                            </div>
                        </div>

                        <p className="text-sm text-muted text-center leading-relaxed flex-1 overflow-hidden">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nobis quidem, totam rem expedita reprehenderit.
                        </p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleCheckoutBook}
                                className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                            >
                                Pegar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
