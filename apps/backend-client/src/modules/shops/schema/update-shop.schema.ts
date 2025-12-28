import { z } from 'zod'

export const UpdateShopParamsSchema = z.object({
  cuid: z.string().cuid(),
})

export const UpdateShopBodySchema = z.object({
  name: z.string().min(3).optional(),
  categoryId: z.number().int().optional(),

  aboutShop: z.string().min(10).optional(),
  aboutSeller: z.string().min(10).optional(),

  daysOfActivity: z.array(z.string()).optional(),

  workingHours: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),

  responseHours: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),

  socialMedia: z
    .object({
      instagram: z.string().optional(),
      telegram: z.string().optional(),
      website: z.string().optional(),
      whatsapp: z.string().optional(),
    })
    .optional(),

  thumbnailImage: z.string().url().optional(),

  galleryImages: z
    .array(
      z.object({
        imageUrl: z.string().url(),
      }),
    )
    .optional(),
})

export const UpdateShopResponseSchema = z.object({
  message: z.string(),
  cuid: z.string().cuid(),
})
