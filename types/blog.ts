import { z } from "zod"

export const blogPostMetadataSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  readTime: z.string(),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().default(true),
})

export type BlogPostMetadata = z.infer<typeof blogPostMetadataSchema>

export interface BlogPost extends BlogPostMetadata {
  slug: string
  content: string
}

export interface BlogPostWithHtml extends BlogPost {
  html: string
}
