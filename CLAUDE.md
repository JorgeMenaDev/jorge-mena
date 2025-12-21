# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **minimalist portfolio website** for Jorge Mena, showcasing professional work and technical writing. It's a Next.js 15 application with an integrated MDX-based blog system, emphasizing clean design, performance, and accessibility.

**Key Characteristics**:
- Dark mode only (no light theme)
- Static site generation with zero backend
- Server components by default
- Type-safe MDX blog with syntax highlighting
- Protected email address (client-side obfuscation against scrapers)

---

## Common Commands

### Development
```bash
bun dev          # Start dev server at localhost:3000 (with hot reload)
bun build        # Build for production (generates static HTML + pre-renders blog posts)
bun start        # Run production server
bun lint         # Run ESLint (note: errors are ignored during build)
```

### Adding Blog Posts
```bash
# 1. Create new .mdx file in /content/blog/
# 2. Add frontmatter with: title, excerpt, date (YYYY-MM-DD), readTime, tags (optional)
# 3. Write markdown content
# 4. File slug is auto-derived from filename (kebab-case)
# 5. Run `bun build` to generate static post pages
```

### Building & Vercel Deployments
- Push to `main` branch triggers automatic Vercel build
- Ensure `bun.lock` is committed for dependency consistency
- Build output is optimized for static hosting (no Node.js backend required)

---

## High-Level Architecture

### Directory Structure

```
app/                    # Next.js App Router - pages and layouts
├── page.tsx            # Home page (hero, work timeline, blog preview, contact)
├── layout.tsx          # Root layout with font setup and global styles
├── globals.css         # Global styles + OKLCH color variables
└── blog/[slug]/        # Dynamic blog post pages (static generation)

components/
├── ui/                 # 60+ Radix UI components (mostly pre-built, not all used)
├── blog/               # Blog-specific: code blocks, callouts, TOC, reading progress
├── protected-email.tsx # Email obfuscation component
└── theme-provider.tsx  # Dark theme provider (forced dark only)

lib/
├── blog.ts            # Blog post fetching & parsing (gray-matter, fs)
├── shiki.ts           # Syntax highlighting configuration
└── utils.ts           # Tailwind class merging utility (cn())

types/                  # TypeScript definitions
├── blog.ts            # BlogPost interfaces + Zod schema validation

content/blog/           # Static markdown/MDX files (source of truth for blog posts)

hooks/                  # Custom React hooks (use-mobile, use-toast)

styles/                 # Additional CSS files
```

### Application Flow

**Home Page** (`app/page.tsx`):
- Single-page design with 4 sections: Intro, Work, Thoughts, Connect
- Uses Intersection Observer for scroll-triggered fade-in animations
- Sticky left navigation with scroll-spy (highlights active section)
- Client component with React hooks for interactivity

**Blog System**:
1. **Build Time**: `generateStaticParams()` pre-renders all blog posts
2. **Content**: Markdown files in `/content/blog/` with YAML frontmatter
3. **Parsing**: `gray-matter` extracts metadata, Zod validates schema
4. **Rendering**: `next-mdx-remote` converts MDX to React components
5. **Highlighting**: Shiki syntax highlighting (16 language support)
6. **Components**: Custom MDX component mapping (code blocks, callouts, etc.)

### Key Design Patterns

**Pattern: Server Components Default**
- Layout and blog pages are server components (no "use client")
- Enables file I/O, environment variables, direct database access
- Blog fetching happens at build time via `generateStaticParams()`

**Pattern: Client-Side Email Protection**
- Server renders `href="#"`
- Client-side JavaScript injects actual `mailto:` link only after hydration
- Prevents email scrapers from finding address in HTML source
- See `/components/protected-email.tsx`

**Pattern: Custom MDX Components**
- Maps HTML elements (h1, p, code) to styled React components
- Enables rich blog content (callouts, highlighted code, images) without duplication
- See `/components/blog/mdx-components.tsx` for element mapping

**Pattern: Type-Safe Content**
- Zod schema validates all blog post metadata at runtime
- TypeScript interfaces for BlogPost, Blog metadata
- Prevents runtime errors from missing or invalid frontmatter

**Pattern: Utility Class Merging**
- `cn()` helper in `/lib/utils.ts` uses `clsx()` + `tailwind-merge`
- Prevents Tailwind class conflicts when combining styles
- Essential for flexible component APIs

---

## Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 15 + React 19 | App Router, Server Components by default |
| **Language** | TypeScript 5 | Strict mode enabled |
| **Styling** | Tailwind CSS v4 | OKLCH color space, custom animations |
| **UI Components** | Radix UI | Accessible, unstyled primitives (60+ available) |
| **Content** | MDX + gray-matter | Markdown with embedded React components |
| **Code Highlighting** | Shiki | 16 language support, theme-aware |
| **Forms** | react-hook-form + Zod | Form validation (minimal usage currently) |
| **Fonts** | Geist (Google Fonts) | Modern sans-serif with @apply integration |
| **Icons** | lucide-react | 450+ icon library |
| **Animations** | Tailwind CSS | fade-in-up, scroll-triggered, staggered |
| **Package Manager** | bun | Faster than npm, compatible with package-lock.json |

---

## Important Implementation Details

### Color System (OKLCH)
- CSS custom properties in `:root` for light mode, `.dark` for dark mode
- Currently dark mode is forced in layout (`<html class="dark">`) and theme provider
- All colors use OKLCH space for perceptually uniform gradients
- CSS variables: `--background`, `--foreground`, `--primary`, `--border`, etc.

### Email Protection
```typescript
// components/protected-email.tsx
// 1. Server renders href="#"
// 2. useEffect runs on client, injects actual email via linkRef.current.href
// 3. Bots only see "#" in HTML source, actual email never in DOM text
```

### Blog Post Structure
```markdown
---
title: "Post Title"
excerpt: "Short description"
date: "2025-12-21"
readTime: "5 min"
tags: ["ai", "web"] # optional
---

# Post content here...
```

### Build Configuration
- ESLint errors ignored during build (intentional)
- TypeScript errors ignored during build (intentional)
- Images use static optimization (unoptimized: true)
- No trailing slash required in URLs

### Responsive Breakpoints
- Mobile detection via `use-mobile.tsx` hook (768px breakpoint)
- Tailwind's default sm/md/lg breakpoints used for layouts
- Mobile-first design approach

---

## Common Development Patterns

### Adding a New Blog Post
1. Create `/content/blog/post-title.mdx` with frontmatter
2. Use markdown + MDX syntax (JSX components work in MDX)
3. Reference custom components: `<Callout>`, `<CodeBlock>`, etc.
4. Run `bun build` to pre-render the new post page
5. Blog listing on home page auto-updates

### Styling with Tailwind
```typescript
// Always use cn() helper to merge classes safely
import { cn } from "@/lib/utils"

export function MyComponent({ className }) {
  return <div className={cn("px-4 py-2", className)} />
}
```

### Using Radix UI Components
```typescript
// Components are in /components/ui/
// Most are ready to use with Tailwind classes applied
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button variant="outline">Click me</Button>
}
```

### MDX Custom Components
```typescript
// In mdx-components.tsx, map HTML to React components
h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
code: ({ className, children }) => {
  // Check className to differentiate inline vs block code
  if (className?.includes("language-")) {
    return <CodeBlock language={extractLanguage(className)}>{children}</CodeBlock>
  }
  return <code className="bg-muted px-1 rounded">{children}</code>
}
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page with all sections + animations |
| `app/blog/[slug]/page.tsx` | Dynamic blog post page template |
| `lib/blog.ts` | Blog post retrieval & metadata parsing |
| `components/blog/mdx-components.tsx` | Custom MDX element mapping |
| `components/protected-email.tsx` | Email protection logic |
| `types/blog.ts` | BlogPost TypeScript types + Zod schema |
| `app/globals.css` | All color variables + global styles |
| `next.config.mjs` | Next.js configuration (image optimization, TypeScript) |
| `tsconfig.json` | TypeScript config (@/* alias, strict mode) |

---

## Build & Deployment Notes

- **Vercel**: Automatically deploys `main` branch
- **Static Hosting**: No Node.js backend required (fully static)
- **Build Time**: Blog posts pre-rendered at build time via `generateStaticParams()`
- **Cache**: Static pages are indefinitely cacheable (set on Vercel)
- **Dependencies**: Use `bun.lock` for consistency across machines

---

## Dark Mode Architecture

**Current Setup**: Dark mode is forced and only available
- Root layout adds `dark` class to `<html>` element
- Theme provider has `forcedTheme="dark"` (no toggle functionality)
- All color variables default to dark values in `:root`
- `.dark` selector in CSS is effectively always active

**To Add Light Mode** (if needed in future):
1. Remove `dark` class from layout
2. Change theme provider to allow switching
3. Light mode variables already defined in `:root`
4. Users would toggle via button (already exists in footer)

---

## Performance Considerations

1. **Static Generation**: All blog posts pre-rendered at build time
2. **No API Calls**: Content stored in filesystem, no database
3. **Minimal JavaScript**: Home page uses Intersection Observer only
4. **Image Optimization**: Currently disabled (static deployment friendly)
5. **Syntax Highlighting**: Done at build time, not runtime (Shiki)

---

## Common Gotchas & Solutions

| Issue | Solution |
|-------|----------|
| New blog post not appearing | Run `bun build` to trigger static generation |
| Styling not updating | Clear `.next` folder: `rm -rf .next && bun build` |
| Email showing in source | That's expected - it's injected client-side |
| Tailwind classes not working | Check `cn()` usage - may need `tailwind-merge` |
| Blog metadata validation error | Check YAML frontmatter format in .mdx file |

---

## Testing the Build Locally

```bash
# Build for production
bun build

# Start production server
bun start

# Open http://localhost:3000 and verify:
# - Home page renders with animations
# - Blog posts load correctly
# - Email link works (opens mail client)
# - Syntax highlighting on code blocks
```

