"use client";

import { useState } from "react";
import { createBook, updateBook } from "@/actions/books.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface BookFormProps {
  book?: {
    id: number;
    title: string;
    author: string;
    category: string;
    totalCopies: number;
    availableCopies: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BookForm({ book, onSuccess, onCancel }: BookFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    category: book?.category || "",
    totalCopies: book?.totalCopies || 1,
    availableCopies: book?.availableCopies || 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalCopies" || name === "availableCopies"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = book
        ? await updateBook({
            id: book.id,
            ...formData,
          })
        : await createBook(formData);

      if (result.data?.success) {
        onSuccess?.();
      } else {
        setError(result.data?.error || "Erro ao salvar livro");
      }
    } catch (err) {
      setError("Erro ao processar formulário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o título do livro"
            required
          />
        </div>

        <div>
          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Digite o nome do autor"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Digite a categoria"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="totalCopies">Total de Cópias</Label>
            <Input
              id="totalCopies"
              name="totalCopies"
              type="number"
              value={formData.totalCopies}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div>
            <Label htmlFor="availableCopies">Cópias Disponíveis</Label>
            <Input
              id="availableCopies"
              name="availableCopies"
              type="number"
              value={formData.availableCopies}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : book ? "Atualizar" : "Criar"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
