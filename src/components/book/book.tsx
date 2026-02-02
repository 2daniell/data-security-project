import { cn } from "@/lib/utils"

interface BookCardProps {
    title: string
    author: string
    colorIndex?: number
    selected?: boolean
    onClick?: () => void
    size?: "normal" | "small"
}

export function BookCard({ title, author, colorIndex = 0, selected, onClick, size = "normal" }: BookCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col text-left transition-all",
                size === "normal" ? "w-40" : "w-[140px]"
            )}
            >
            <div
                className={cn(
                "relative rounded-xl overflow-hidden mb-3 transition-all",
                size === "normal" ? "h-[200px] w-40" : "h-[180px] w-[140px]",
                selected && "ring-4 ring-primary ring-offset-2"
                )}
            >
                <BookCover title={title} author={author} colorIndex={colorIndex} />
            </div>

            <h3 className="font-semibold text-sm text-foreground truncate w-full">{title}</h3>
            <p className="text-xs text-muted-foreground truncate w-full">{author}</p>
        </button>
    )
}

interface BookCoverProps {
    title: string
    author: string
    colorIndex?: number
    className?: string
}

const coverStyles = [
    {
        bg: "bg-gradient-to-br from-amber-100 via-orange-50 to-white",
        accent: "bg-amber-600",
        titleColor: "text-amber-900",
        authorColor: "text-amber-600",
    },
    {
        bg: "bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950",
        accent: "bg-white",
        titleColor: "text-white",
        authorColor: "text-emerald-200",
    },
    {
        bg: "bg-gradient-to-br from-sky-100 via-sky-50 to-white",
        accent: "bg-sky-600",
        titleColor: "text-sky-900",
        authorColor: "text-sky-600",
    }
]

export function BookCover({ title, author, colorIndex = 0, className }: BookCoverProps) {
    const style = coverStyles[colorIndex % coverStyles.length]
  
    return (
        <div
            className={cn(
                "relative w-full h-full rounded-xl overflow-hidden shadow-lg",
                style.bg,
                className
            )}
        >

            <div className={cn("absolute top-0 left-0 w-1 h-full", style.accent)} />
            
            <div className={cn("absolute top-4 right-4 w-8 h-8 rounded-full opacity-20", style.accent)} />
            
            <div className={cn("absolute bottom-8 right-6 w-12 h-12 rounded-full opacity-10", style.accent)} />
        
            
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-center px-2">
                    <h3 className={cn("font-bold text-base leading-tight mb-2 line-clamp-3", style.titleColor)}>
                        {title}
                    </h3>
                </div>
                
                <div className="pt-2 border-t border-white/10">
                    <p className={cn("text-xs font-medium truncate", style.authorColor)}>
                        {author}
                    </p>
                </div>
            </div>
        
        
            <div className="absolute left-0 top-0 w-3 h-full bg-black/10" />
        </div>
    )
}

