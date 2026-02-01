"use client";

import { useState } from "react";
import { createBook, updateBook } from "@/actions/books.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

/**
 * Sanitização básica contra XSS
 * Remove caracteres perigosos e espaços extras
 */
const sanitizeText = (value: string) =>
  value.replace(/[<>]/g, "").trim();

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
          ? Math.max(0, parseInt(value) || 0)
          : sanitizeText(value),
    }));
  };

  /**
   * Validação de regras de negócio
   */
  const validateForm = () => {
    if (!formData.title || !formData.author || !formData.category) {
      setError("Todos os campos de texto são obrigatórios");
      return false;
    }

    if (formData.availableCopies > formData.totalCopies) {
      setError("Cópias disponíveis não podem ser maiores que o total");
      return false;
    }

    if (formData.title.length > 100) {
      setError("Título excede o tamanho máximo permitido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

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
    } catch {
      setError("Erro inesperado ao processar o formulário");
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
            maxLength={100}
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
            maxLength={100}
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
            maxLength={50}
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
              min={1}
              value={formData.totalCopies}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="availableCopies">Cópias Disponíveis</Label>
            <Input
              id="availableCopies"
              name="availableCopies"
              type="number"
              min={0}
              value={formData.availableCopies}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

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
