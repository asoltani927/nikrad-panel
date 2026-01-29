import { z } from 'zod'

export const GetShopParams = z.object({
  cuid: z.string().cuid(),
})

export const ShopDetailSchema = z.object({
  cuid: z.string().cuid(),
  name: z.string(),

  about: z.string().nullable(),
  aboutSeller: z.string().nullable(),

  successDeals: z.number(),
  failedDeals: z.number(),

  thumbnailImage: z.string().nullable(),

  owner: z.object({
    id: z.number(),
    name: z.string().nullable(),
    fullName: z.string(),
  }),

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
