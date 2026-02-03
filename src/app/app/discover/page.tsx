"use client"
import { createLoan } from "@/actions/loan/loan.action"
import { BookCard, BookCover } from "@/components/book/book"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useState } from "react"
import { toast } from "sonner"

const allBooks = [
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    colorIndex: 0,
    rating: 4.7,
    pages: 256,
    ratings: 892,
    reviews: 234,
    description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
  },
  {
    id: 2,
    title: "How Innovation Works",
    author: "Matt Ridley",
    colorIndex: 1,
    rating: 4.5,
    pages: 416,
    ratings: 521,
    reviews: 89,
    description: "Innovation is the main event of the modern age, the reason we experience both dramatic improvements in our living standards and unsettling changes in our society.",
  },
  {
    id: 3,
    title: "Company of One",
    author: "Paul Jarvis",
    colorIndex: 2,
    rating: 4.8,
    pages: 320,
    ratings: 643,
    reviews: 110,
    description: "Company of One offers a refreshingly original business strategy that's focused on a commitment to being better instead of bigger. Why? Because staying small provides one with the freedom to pursue more meaningful pleasures in life—and avoid the headaches that...",
  },
  {
    id: 4,
    title: "Stupore E Tremori",
    author: "Amelie Nothomb",
    colorIndex: 3,
    rating: 4.2,
    pages: 184,
    ratings: 312,
    reviews: 67,
    description: "A darkly comic autobiographical novel about a young Belgian woman's experiences working for a Japanese corporation in Tokyo.",
  },
  {
    id: 5,
    title: "The Bees",
    author: "Laline Paull",
    colorIndex: 4,
    rating: 4.3,
    pages: 352,
    ratings: 478,
    reviews: 156,
    description: "Born into the lowest class of her society, Flora 717 is a sanitation bee, only fit to clean her hive. But Flora has talents that are not typical of her kind.",
  },
  {
    id: 6,
    title: "Real Help",
    author: "Ayodeji Awosika",
    colorIndex: 7,
    rating: 4.6,
    pages: 224,
    ratings: 389,
    reviews: 92,
    description: "An honest guide to self-improvement with practical advice that actually works. No fluff, just real strategies for building a better life.",
  },
  {
    id: 7,
    title: "The Fact of a Body",
    author: "Alexandria Marzano-Lesnevich",
    colorIndex: 8,
    rating: 4.4,
    pages: 336,
    ratings: 567,
    reviews: 143,
    description: "A memoir and true crime masterpiece that explores the blurred lines between victim and perpetrator, memory and truth.",
  },
  {
    id: 8,
    title: "The Room",
    author: "Jonas Karlsson",
    colorIndex: 5,
    rating: 4.1,
    pages: 192,
    ratings: 234,
    reviews: 58,
    description: "A psychological novel about a man who discovers a secret room at his workplace that only he can see. A dark comedy about office life and obsession.",
  },
  {
    id: 9,
    title: "Through the Breaking",
    author: "Cate Emond",
    colorIndex: 6,
    rating: 4.5,
    pages: 288,
    ratings: 412,
    reviews: 87,
    description: "A powerful story about resilience, family, and finding hope in the darkest of times. An unforgettable journey of self-discovery.",
  },
  {
    id: 10,
    title: "Through the Breaking",
    author: "Cate Emond",
    colorIndex: 6,
    rating: 4.5,
    pages: 288,
    ratings: 412,
    reviews: 87,
    description: "A powerful story about resilience, family, and finding hope in the darkest of times. An unforgettable journey of self-discovery.",
  },
  {
    id: 11,
    title: "Through the Breaking",
    author: "Cate Emond",
    colorIndex: 6,
    rating: 4.5,
    pages: 288,
    ratings: 412,
    reviews: 87,
    description: "A powerful story about resilience, family, and finding hope in the darkest of times. An unforgettable journey of self-discovery.",
  },
  {
    id: 12,
    title: "Through the Breaking",
    author: "Cate Emond",
    colorIndex: 6,
    rating: 4.5,
    pages: 288,
    ratings: 412,
	reviews: 87,
    description: "A powerful story about resilience, family, and finding hope in the darkest of times. An unforgettable journey of self-discovery.",
  }
]

const recommendedBooks = allBooks.slice(0, 4)
const categoryBooks = allBooks.slice(4)

const categories = ["All", "Sci-Fi", "Fantasy", "Drama", "Business", "Education", "Geography"]

export default function Discover() {

    const [ selectedBook, setSelectedBook ] = useState(allBooks[0]);
    
	const { execute } = useAction(createLoan, {
		onSuccess: ({ data }) => {
			toast.success(data.message, { position: "top-center" } )
		},
		onError: ({ error }) => {
			console.log(JSON.stringify(error, null, 2));
			toast.info(error.serverError, { position: "top-center"})
		}
	});

	const handleCheckoutBook = () => {
		execute({ bookId: selectedBook.id });
	}

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
						{allBooks.length > 0 ? (
							allBooks.map((book) => (
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
				
				<div className="relative w-full h-[280px] rounded-2xl overflow-hidden mb-4 shadow-lg">
					<BookCover title={selectedBook.title} author={selectedBook.author} colorIndex={selectedBook.id} />
				</div>

				<div className="text-center mb-4">

					<h2 className="font-bold text-lg text-primary-foreground mb-1">{selectedBook.title}</h2>
					<p className="text-sm text-muted mb-2">{selectedBook.author}</p>
						
					<div className="flex items-center justify-center gap-1">
						{[...Array(5)].map((_, i) => (
							<Star
							key={i}
							className={cn(
								"w-4 h-4",
								i < Math.floor(selectedBook.rating)
								? "fill-yellow-400 text-yellow-400"
								: "fill-gray-200 text-gray-200"
							)}
							/>
						))}
						<span className="text-sm font-medium text-primary-foreground ml-1">{selectedBook.rating}</span>
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
					{selectedBook.description}
				</p>

      			<div className="flex gap-3 mt-4">
					<button onClick={handleCheckoutBook} className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
						Pegar
        			</button>
      			</div>
			</div>
		</>
    )
}