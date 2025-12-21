"use client"

import { Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { highlightCode } from "@/lib/shiki"

interface CodeBlockProps {
  children: string
  className?: string
}

export async function CodeBlock({ children, className = "" }: CodeBlockProps) {
  // Extract language from className (e.g., "language-typescript" -> "typescript")
  const match = className.match(/language-(\w+)/)
  const language = match ? match[1] : "plaintext"

  let html = ""
  try {
    html = await highlightCode(children.trim(), language, "github-dark")
  } catch (error) {
    console.error("Error highlighting code:", error)
    html = `<pre><code>${escapeHtml(children.trim())}</code></pre>`
  }

  return (
    <CodeBlockClient language={language} code={children.trim()} highlightedHtml={html} />
  )
}

interface CodeBlockClientProps {
  language: string
  code: string
  highlightedHtml: string
}

function CodeBlockClient({ language, code, highlightedHtml }: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-muted">
      <div className="flex items-center justify-between bg-muted px-4 py-2 text-xs font-mono text-muted-foreground">
        <span>{language}</span>
        <button
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-muted-foreground/10 transition-colors duration-300"
          aria-label={copied ? "Code copied" : "Copy code"}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code
          className="font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          aria-label={`Code block in ${language}`}
        />
      </pre>
    </div>
  )
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
