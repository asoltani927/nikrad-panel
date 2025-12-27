import { z } from 'zod'

export const GetShopParams = z.object({
  cuid: z.string().cuid(),
})

export const ShopDetailSchema = z.object({
  cuid: z.string().cuid(),
  name: z.string(),
  aboutShop: z.string(),
  aboutSeller: z.string(),
  successDeals: z.number(),
  failedDeals: z.number(),
  thumbnailImage: z.string().nullable(),

  owner: z.object({
    id: z.number(),
    name: z.string(),
    fullName: z.string(),
  }),

  category: z.object({
    id: z.number(),
    name: z.string(),
  }),

  galleryImages: z.array(
    z.object({
      imageUrl: z.string(),
    }),
  ),

  reviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string(),
      user: z.object({
        fullName: z.string(),
      }),
    }),
  ),
})
