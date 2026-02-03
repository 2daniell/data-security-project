import { getAllBooks } from "@/actions/book/book.action";
import Books from "@/components/book/book-page";

export default async  function BooksPage() {

    const data = (await getAllBooks()).data ?? []

    return (
        <Books books={data} />
    )
}