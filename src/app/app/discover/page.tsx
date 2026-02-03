import { getAllBooks } from "@/actions/book/book.action"
import Discover from "@/components/discover/discover";

export default async function DiscoverPage() {

	const data = (await getAllBooks()).data ?? [];

    return (
        <Discover books={data} />
    )
}