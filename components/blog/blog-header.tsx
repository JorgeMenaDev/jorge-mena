import Link from "next/link"
import { formatDate } from "@/lib/blog"
import { ChevronRight } from "lucide-react"

interface BlogHeaderProps {
  title: string
  date: string
  readTime: string
  tags?: string[]
}

export function BlogHeader({ title, date, readTime, tags = [] }: BlogHeaderProps) {
  return (
    <header className="mb-16 space-y-6 animate-fade-in-up">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="hover:text-foreground transition-colors duration-300"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <Link
          href="/#thoughts"
          className="hover:text-foreground transition-colors duration-300"
        >
          Blog
        </Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="text-foreground">{title}</span>
      </nav>

      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={date} className="font-mono">
            {formatDate(date)}
          </time>
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span aria-label={`Estimated reading time: ${readTime}`}>
            {readTime} read
          </span>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs border border-border rounded-full bg-muted/50 text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-border/50 pt-6" aria-hidden="true" />
    </header>
  )
}
