import { z } from 'zod'

export const ShopSchema = z.object({
  cuid: z.string().cuid(),
  name: z.string(),
  owner: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  successDeals: z.number(),
  failedDeals: z.number(),
  aboutShop: z.string().nullable(),
  aboutSeller: z.string().nullable(),
  thumbnailImage: z.string().nullable(),
  galleryImages: z.array(z.string()),
  reviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string().nullable(),
      user: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
    }),
  ),
})

export const ShopsResponseSchema = z.object({
  shops: z.array(ShopSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    links: z.record(z.string(), z.string().nullable()).optional(),
  }),
})
