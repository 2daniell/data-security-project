"use client";

import { Book, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { deleteBook, deactivateBook } from "@/actions/books.action";
import { useState } from "react";

interface BooksTableProps {
  books: Array<{
    id: number;
    title: string;
    author: string;
    category: string;
    totalCopies: number;
    availableCopies: number;
    isActive: boolean;
  }>;
  onEdit?: (book: any) => void;
  onRefresh?: () => void;
}

export function BooksTable({ books, onEdit, onRefresh }: BooksTableProps) {
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este livro?")) return;

    setDeleting(id);
    try {
      const result = await deleteBook({ id });
      if (result.data?.success) {
        onRefresh?.();
      }
    } finally {
      setDeleting(null);
    }
  };

  const handleDeactivate = async (id: number) => {
    if (!confirm("Tem certeza que deseja desativar este livro?")) return;

    try {
      const result = await deactivateBook({ id });
      if (result.data?.success) {
        onRefresh?.();
      }
    } catch {
      console.error("Erro ao desativar livro");
    }
  };

  if (books.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Nenhum livro cadastrado</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b">
            <tr>
              <th className="px-4 py-3 text-left">Título</th>
              <th className="px-4 py-3 text-left">Autor</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-center">Total</th>
              <th className="px-4 py-3 text-center">Disponíveis</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.category}</td>
                <td className="px-4 py-3 text-center">{book.totalCopies}</td>
                <td className="px-4 py-3 text-center font-semibold">
                  {book.availableCopies}
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={book.isActive ? "default" : "secondary"}>
                    {book.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => onEdit?.(book)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    <Button size="sm" variant="ghost" onClick={() => handleDeactivate(book.id)}>
                      <Book className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={deleting === book.id}
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
