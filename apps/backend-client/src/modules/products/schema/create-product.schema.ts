import z from 'zod'

export const CreateProductBodySchema = z.object({
  name: z.string().min(2),
  slug: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),

  categoryId: z.string(),
  brandId: z.string().optional(),
  sellerId: z.string().optional(),

  sku: z.string().optional(),
  barcode: z.string().optional(),

  shortDescription: z.string().optional(),
  description: z.string().optional(),

  featured: z.boolean().default(false),
  todayDeal: z.boolean().default(false),
  active: z.boolean().default(true),
  type: z.string(),
})

export const ProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  stock: z.number(),
  message: z.string(),
})
