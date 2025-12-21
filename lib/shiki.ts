import { createHighlighter, type HighlighterCore } from "shiki"

let highlighterInstance: HighlighterCore | null = null

export async function getHighlighter(): Promise<HighlighterCore> {
  if (highlighterInstance) {
    return highlighterInstance
  }

  highlighterInstance = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [
      "javascript",
      "typescript",
      "jsx",
      "tsx",
      "python",
      "java",
      "css",
      "html",
      "bash",
      "shell",
      "json",
      "yaml",
      "markdown",
      "sql",
      "go",
      "rust",
    ],
  })

  return highlighterInstance
}

export async function highlightCode(code: string, language: string = "plaintext", theme: "github-light" | "github-dark" = "github-dark"): Promise<string> {
  const highlighter = await getHighlighter()

  try {
    const html = highlighter.codeToHtml(code, {
      lang: language,
      theme: theme,
      transformers: [],
    })
    return html
  } catch (error) {
    console.error(`Error highlighting code for language "${language}":`, error)
    // Fallback to plaintext
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
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
