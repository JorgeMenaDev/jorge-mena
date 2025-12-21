import { MDXRemote } from "next-mdx-remote/rsc"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getPostSlugs, formatDate } from "@/lib/blog"
import { BlogHeader } from "@/components/blog/blog-header"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { mdxComponents } from "@/components/blog/mdx-components"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post not found",
    }
  }

  return {
    title: `${post.title} | Jorge Mena`,
    description: post.excerpt,
    authors: [{ name: "Jorge Mena" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Jorge Mena"],
      url: `https://jorgemena.dev/blog/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@JorgeMenaDev",
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-3">
            <article>
              <BlogHeader
                title={post.title}
                date={post.date}
                readTime={post.readTime}
                tags={post.tags}
              />

              <div className="prose dark:prose-invert prose-lg max-w-none">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>

              {/* Footer */}
              <footer className="mt-16 border-t border-border pt-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Written by Jorge Mena</p>
                    <p>
                      Published on{" "}
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Just read "${post.title}" by @JorgeMenaDev\n\nhttps://jorgemena.dev/blog/${slug}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded border border-border hover:border-foreground/30 transition-colors duration-300 text-sm text-muted-foreground hover:text-foreground"
                    >
                      Share on Twitter
                    </a>
                  </div>
                </div>
              </footer>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </main>
    </div>
  )
}
