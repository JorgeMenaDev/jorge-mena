import Link from "next/link"
import Image from "next/image"
import { CodeBlock } from "./code-block"
import { Callout } from "./callout"

interface MDXComponents {
  [key: string]: any
}

export const mdxComponents: MDXComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6 mt-12 first:mt-0 animate-stagger-in" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 mt-10 border-b border-border/50 pb-3 animate-stagger-in" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl sm:text-3xl font-light mb-4 mt-8 animate-stagger-in" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg leading-relaxed mb-6 text-muted-foreground animate-stagger-in" {...props} />
  ),
  a: ({ href, children, ...props }: any) => (
    <Link
      href={href}
      className="text-foreground underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors duration-300"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: (props: any) => (
    <ul className="mb-6 ml-6 space-y-2 text-muted-foreground list-disc list-outside animate-stagger-in" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-6 ml-6 space-y-2 text-muted-foreground list-decimal list-outside animate-stagger-in" {...props} />
  ),
  li: (props: any) => (
    <li className="text-lg leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-muted-foreground/30 pl-6 my-6 italic text-muted-foreground animate-stagger-in" {...props} />
  ),
  code: ({ children, className = "", ...props }: any) => {
    // Check if this is a code block (has language class) or inline code
    if (className.includes("language-")) {
      return (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      )
    }
    // Inline code
    return (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    )
  },
  pre: (props: any) => (
    // Don't render pre tag - CodeBlock handles it
    <>{props.children}</>
  ),
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-8 animate-stagger-in">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg shadow-lg w-full h-auto"
        {...props}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  table: (props: any) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse animate-stagger-in" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="divide-y divide-border" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-muted/50 transition-colors duration-300" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-2 text-left font-semibold border-b border-border" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-2 border-b border-border text-muted-foreground" {...props} />
  ),
  hr: (props: any) => (
    <hr className="my-12 border-border/50" {...props} />
  ),
  Callout,
}
