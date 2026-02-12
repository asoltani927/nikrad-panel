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

  // category: z.object({
  //   id: z.number(),
  //   name: z.string(),
  // }),
  daysOfActivity: z.array(z.string()),
  workingHours: z.object({
    from: z.string(),
    to: z.string(),
  }),
  responseHours: z.object({
    from: z.string(),
    to: z.string(),
  }),
  socialMedia: z.object({
    instagram: z.string().nullable().optional(),
    telegram: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    whatsapp: z.string().nullable().optional(),
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
