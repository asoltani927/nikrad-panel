import { z } from 'zod'

export const ShopSchema = z.object({
  cuid: z.string(),
  name: z.string(),
  about: z.string().nullable(),
  aboutSeller: z.string().nullable(),

  successDeals: z.number(),
  failedDeals: z.number(),

  thumbnailImage: z.string().nullable(),

  owner: z
    .object({
      id: z.number(),
      name: z.string().nullable(),
      fullName: z.string(),
    })
    .nullable(),

  category: z.object({
    id: z.number(),
    name: z.string(),
  }),

  galleryImages: z.array(z.string()),

  shopReviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string().nullable(),
      user: z.object({
        fullName: z.string(),
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
