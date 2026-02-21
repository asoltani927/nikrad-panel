import { z } from 'zod'

// Define the Status as an enum for better type safety
export const BlogStatus = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])

export const GetBlogsQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  authorId: z.coerce.number().optional(),
  sort: z.enum(['newest', 'mostViewed', 'published']).default('newest'),
})

export const BlogItemSchema = z.object({
  id: z.number(),
  cuid: z.string(),
  title: z.string(),
  slug: z.string(),

  status: BlogStatus,

  excerpt: z.string().nullable(),
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

  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),

  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    }),
  ),
})

export const PaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
})

export const BlogsResponseSchema = z.object({
  blogs: z.array(BlogItemSchema),
  pagination: PaginationSchema,
})
