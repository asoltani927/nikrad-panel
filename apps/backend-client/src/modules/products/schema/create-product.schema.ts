import z from 'zod'

export const CreateProductBodySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  type: z.enum(['PHYSICAL', 'DIGITAL', 'SERVICE']),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  brandId: z.string().optional(),
  categoryId: z.string(),
})

export const ProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  sku: z.string().nullable(),
  barcode: z.string().nullable(),
  price: z.number(),
  stock: z.number(),
  status: z.string(),
  type: z.string(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.string(),
})

export const CreateProductResponseSchema = z.object({
  product: ProductResponseSchema,
})
