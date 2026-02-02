import { AlertCircle, Calendar, CheckCircle2, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BookCover } from "../book/book";
import { cn } from "@/lib/utils";

type LoanStatus = "active" | "returned" | "overdue";
type LoanStatusStyle = { label: string, icon: LucideIcon, className: string }

const statusConfig: Record<LoanStatus, LoanStatusStyle> = {
  active: {
    label: "Ativo",
    icon: Clock,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  returned: {
    label: "Devolvido",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-700 border-green-200",
  },
  overdue: {
    label: "Atrasado",
    icon: AlertCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
}

type Loan = {
    id: number,
    bookTitle: string,
    bookAuthor: string,
    dueDate: Date,
    returnDate: Date | null,
    loanDate: Date,
}

export default function Loans({ loans }: { loans: Loan[]} ) {
    return (
        <div className="flex-1 flex flex-col h-full overflow-auto p-6 bg-[#eaeef4]">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Meus Emprestimos</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Gerencie seus emprestimos de livros e registre devoluções
                </p>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Livro
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Data Emprestimo
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Data Devolução
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Status
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans!.length > 0 ? (
                            loans!.map((loan) => {
                            
                                const status = statusConfig["active"]
                                const StatusIcon = status.icon
                    
                                return (
                                    <tr
                                        key={loan.id}
                                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                                                    <BookCover
                                                        title={loan.bookTitle}
                                                        author={loan.bookAuthor}
                                                        colorIndex={loan.id}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {loan.bookTitle}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {loan.bookAuthor}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-sm text-foreground">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                {/* {formatDate(loan.borrowDate)} */}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-sm text-foreground">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                
                                                {/* {loan.returnDate
                                                    ? formatDate(loan.returnDate)
                                                    : formatDate(loan.dueDate)
                                                } */}
                                                {!loan.dueDate && (
                                                <span className="text-xs text-muted-foreground">
                                                    (previsto)
                                                </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                                                status.className
                                                )}
                                            >
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {false && (
                                                <button
                                                    onClick={() => {}}
                                                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                                >
                                                    Devolver
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-12 text-center">
                                    <p className="text-muted-foreground">
                                        Nenhum emprestimo encontrado.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}