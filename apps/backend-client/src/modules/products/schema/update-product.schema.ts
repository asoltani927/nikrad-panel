import { z } from 'zod'
import { ProductCondition } from '@dokamerce/web-sdk'

export const ProductConditionEnum = z.nativeEnum(ProductCondition)

export const ProductTypeEnum = z.enum(['DIGITAL', 'PHYSICAL'])

export const ProductVariantAttributeSchema = z.object({
  attributeId: z.string(),
  value: z.string(),
})

export const ProductVariantSellerSchema = z.object({
  active: z.boolean().optional(),
  barcode: z.string().nullable(),
  discountEndAt: z.number().nullable(),
  discountStartAt: z.number().nullable(),
  discountFixed: z.number().nullable(),
  discountPercentage: z.number().nullable(),
  priceDiff: z.number(),
  quantity: z.number().int(),
  sellerId: z.string().nullable(),
  sku: z.string().nullable(),
})

export const ProductVariantSchema = z.object({
  active: z.boolean().optional(),
  color: z.string().nullable(),
  attributes: z.array(ProductVariantAttributeSchema),
  sellers: z.array(ProductVariantSellerSchema).optional(),
})

export const UpdateProductBodySchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),

  categoryId: z.string(),
  brandId: z.string(),
  currencyId: z.string(),
  sizeGroupId: z.string(),

  content: z.string(),
  description: z.string().nullable().optional(),

  publishedAt: z.coerce.date(),

  featured: z.boolean().default(false),
  todayDeal: z.boolean().default(false),
  active: z.boolean().default(true),

  thumbnailId: z.string().optional(),
  imageIds: z.array(z.string()).optional(),
  videoIds: z.array(z.string()).optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),

  minOrderQty: z.number().optional(),
  maxOrderQty: z.number().optional(),

  warrantyDescription: z.string().optional(),
  warrantyTime: z.string().optional(),
  warrantyType: z.string().optional(),

  variants: z.array(ProductVariantSchema),

  businessRules: z.record(z.string(), z.any()).optional(),
})

export const UpdateProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  message: z.string(),
})
