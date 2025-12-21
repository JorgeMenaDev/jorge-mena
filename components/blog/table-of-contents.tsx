"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TableOfContentsItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from HTML content
  useEffect(() => {
    // Parse content to find h2 and h3 headings
    // This is a simple regex-based approach
    const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h\1>/g
    const matches = Array.from(content.matchAll(headingRegex))

    const extracted: TableOfContentsItem[] = matches.map((match) => ({
      id: match[2],
      title: match[3].replace(/<[^>]*>/g, ""), // Remove any HTML tags
      level: parseInt(match[1]),
    }))

    setHeadings(extracted)
  }, [content])

  // Intersection Observer for active section
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -50% 0px" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      className="sticky top-20 mb-8 max-h-[calc(100vh-100px)] overflow-y-auto rounded-lg border border-border bg-muted/50 p-4"
      aria-label="Table of contents"
    >
      <h2 className="mb-4 text-sm font-semibold text-foreground">On this page</h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <Link
              href={`#${heading.id}`}
              className={`inline-block rounded px-2 py-1 transition-colors duration-300 ${
                activeId === heading.id
                  ? "bg-foreground/10 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(heading.id)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              {heading.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
