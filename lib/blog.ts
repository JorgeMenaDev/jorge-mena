import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { blogPostMetadataSchema, type BlogPost, type BlogPostMetadata } from "@/types/blog"

const postsDirectory = path.join(process.cwd(), "content/blog")

// Convert title to kebab-case slug
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = fs.readdirSync(postsDirectory)
    const posts: BlogPost[] = []

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue

      const filePath = path.join(postsDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(fileContent)

      const metadata = blogPostMetadataSchema.parse(data)
      const slug = file.replace(/\.mdx$/, "")

      posts.push({
        slug,
        content,
        ...metadata,
      })
    }

    // Sort by date descending (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    const metadata = blogPostMetadataSchema.parse(data)

    return {
      slug,
      content,
      ...metadata,
    }
  } catch (error) {
    console.error(`Error reading blog post "${slug}":`, error)
    return null
  }
}

// Get all post slugs for static generation
export async function getPostSlugs(): Promise<string[]> {
  try {
    const files = fs.readdirSync(postsDirectory)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""))
  } catch (error) {
    console.error("Error reading post slugs:", error)
    return []
  }
}

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
