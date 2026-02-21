import { z } from 'zod'

export const GetBlogParams = z.object({
  cuid: z.string(),
})

const BlogCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

const BlogTagSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
})

const BlogCommentSchema = z.object({
  comment: z.string(),
  createdAt: z.date(),
  user: z.object({
    fullName: z.string(),
  }),
})

export const BlogDetailSchema = z.object({
  cuid: z.string(),

  title: z.string(),
  slug: z.string(),

  excerpt: z.string().nullable(),
  content: z.string(),

  image: z.string().nullable(),

  views: z.number(),
  readingTime: z.number().nullable(),

  publishedAt: z.date().nullable(),

  author: z
    .object({
      id: z.number(),
      fullName: z.string(),
    })
    .nullable(),

  categories: z.array(BlogCategorySchema),
  tags: z.array(BlogTagSchema),
  comments: z.array(BlogCommentSchema),
})
