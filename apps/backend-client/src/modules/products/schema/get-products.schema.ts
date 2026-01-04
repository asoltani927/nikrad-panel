import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),

  active: z.boolean(),
  featured: z.boolean(),
  todayDeal: z.boolean(),

  soldCount: z.number(),
  views: z.number(),

  status: z.string(),
  type: z.string(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date().nullable(),

  description: z.string().nullable(),
  content: z.string().nullable(),

  warrantyDescription: z.string().nullable(),
  warrantyTime: z.string().nullable(),
  warrantyType: z.string().nullable(),

  maxOrderQty: z.boolean().nullable(),
  minOrderQty: z.boolean().nullable(),

  metaTitle: z.boolean().nullable(),
  metaDescription: z.boolean().nullable(),
  metaKeywords: z.boolean().nullable(),

  brand: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }).nullable(),

  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }).nullable(),

  thumbnail: z.object({
    id: z.string(),
    url: z.string(),
  }),

  files: z.array(z.object({
    id: z.string(),
    url: z.string(),
  })),

  variants: z.array(z.object({
    id: z.string(),
    price: z.number(),
    stock: z.number(),
  })),
})

export const GetProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
})
