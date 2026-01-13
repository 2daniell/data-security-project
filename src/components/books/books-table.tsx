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
    if (!confirm("Tem certeza que deseja deletar este livro?")) return;

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
    } catch (err) {
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
              <th className="text-left px-4 py-3 text-sm font-semibold">
                Título
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold">
                Autor
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold">
                Categoria
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold">
                Total
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold">
                Disponíveis
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold">
                Status
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map((book) => (
              <tr
                key={book.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{book.title}</td>
                <td className="px-4 py-3 text-sm">{book.author}</td>
                <td className="px-4 py-3 text-sm">{book.category}</td>
                <td className="px-4 py-3 text-sm text-center">
                  {book.totalCopies}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <span
                    className={
                      book.availableCopies > 0
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {book.availableCopies}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <Badge variant={book.isActive ? "default" : "secondary"}>
                    {book.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit?.(book)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeactivate(book.id)}
                    >
                      <Book className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(book.id)}
                      disabled={deleting === book.id}
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
