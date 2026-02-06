# Repository Guidelines

## Project Structure

- `app/`: Next.js App Router pages/layouts (`app/layout.tsx`, `app/page.tsx`, `app/blog/[slug]/page.tsx`)
- `components/`: Reusable React components
  - `components/ui/`: shadcn/Radix UI primitives (mostly generated)
  - `components/blog/`: MDX/blog rendering pieces (TOC, code blocks, callouts)
- `content/blog/`: Source-of-truth `.mdx` posts (filename = slug, `kebab-case.mdx`)
- `lib/`: Helpers (`lib/blog.ts`, `lib/shiki.ts`, `lib/utils.ts`)
- `public/`: Static assets served as-is
- `types/`: Shared TypeScript types and Zod schemas

## Build, Test, and Development Commands

Use **Bun only**. `bun.lock` is the lockfile; avoid `npm`/`yarn`/`pnpm`.

```bash
bun install            # Install deps
bun dev                # Dev server (http://localhost:3000)
bun build              # Production build
bun start              # Run production server
bun lint               # ESLint via Next.js
bunx tsc --noEmit      # Typecheck (tsconfig.json)
```

## Coding Style & Naming

- TypeScript + React 19; prefer functional components and small, composable modules.
- Server Components by default; add `"use client"` only when needed.
- Filenames: `kebab-case.tsx`; exported components: `PascalCase`.
- Hooks live in `hooks/` and follow `use-*.ts` naming.
- Tailwind CSS v4: keep class strings readable; reuse `cn()` from `lib/utils.ts`.

## Content (MDX Blog)

- Add posts in `content/blog/`.
- Frontmatter must include: `title`, `excerpt`, `date` (`YYYY-MM-DD`), `readTime`.
- Optional frontmatter: `tags` (string[]), `published` (boolean).

## Testing Guidelines

No automated test suite is configured yet. If you add tests, prefer `bun test` and name files `*.test.ts(x)` near the code they cover.

## Commit & Pull Request Guidelines

- Commit subjects are short, imperative, descriptive (examples: “Fix …”, “Add …”, “Update …”).
- PRs: describe the change, link issues if applicable, and include screenshots for any UI/UX change.

## Security & Config

- Don’t commit secrets. Use `.env.local` for local-only values.
- Keep `README.md` and `CLAUDE.md` aligned with any workflow or architecture changes.
