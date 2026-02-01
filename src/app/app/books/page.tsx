"use client";

import { useEffect, useState } from "react";
import { listBooks } from "@/actions/books.action";
import { BooksTable } from "@/components/books/books-table";
import { BookForm } from "@/components/books/book-form";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<any | null>(null);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const result = await listBooks();
      if (result.data?.success) {
        setBooks(result.data.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBook(null);
    loadBooks();
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-6 text-center">Carregando...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Livros</h1>
          <p className="text-muted-foreground">
            Cadastre, edite e gerencie os livros da biblioteca
          </p>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Livro
          </Button>
        )}
      </div>

      {showForm && (
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 -top-2"
            onClick={() => setShowForm(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <BookForm
            book={editingBook}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <BooksTable
        books={books}
        onEdit={handleEdit}
        onRefresh={loadBooks}
      />
    </div>
  );
}
