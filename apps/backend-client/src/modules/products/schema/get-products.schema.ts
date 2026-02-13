import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  slug: z.string().default(''),
  price: z.number().default(0),

  active: z.boolean().default(false),
  featured: z.boolean().default(false),
  todayDeal: z.boolean().default(false),

  soldCount: z.number().default(0),
  views: z.number().default(0),

  status: z.string().default(''),
  type: z.string().default(''),

  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
  publishedAt: z.coerce.date().nullable().default(null),

  description: z.string().nullable().default(null),
  content: z.string().nullable().default(null),

  warrantyDescription: z.string().nullable().default(null),
  warrantyTime: z.string().nullable().default(null),
  warrantyType: z.string().nullable().default(null),

  maxOrderQty: z.number().nullable().default(null),
  minOrderQty: z.number().nullable().default(null),

  metaTitle: z.string().nullable().default(null),
  metaDescription: z.string().nullable().default(null),
  metaKeywords: z.string().nullable().default(null),

  brand: z.object({
    id: z.string().default(''),
    name: z.string().default(''),
    slug: z.string().default(''),
  }).nullable().default(null),

  category: z.object({
    id: z.string().default(''),
    name: z.string().default(''),
    slug: z.string().default(''),
  }).nullable().default(null),

  thumbnail: z.object({
    id: z.string().default(''),
    url: z.string().default(''),
  }).default({ id: '', url: '' }),

  files: z.array(z.object({
    id: z.string().default(''),
    url: z.string().default(''),
  })).default([]),

  variants: z.array(z.object({
    id: z.string().default(''),
    price: z.number().default(0),
    stock: z.number().default(0),
  })).default([]),
});

export const GetProductsResponseSchema = z.object({
  products: z.array(ProductSchema).default([]),
});
