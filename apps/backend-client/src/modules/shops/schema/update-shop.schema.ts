import { z } from 'zod'

export const UpdateShopParamsSchema = z.object({
  cuid: z.string().cuid(),
})

const TimeRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
})

const SocialMediaSchema = z.object({
  instagram: z.string().optional(),
  telegram: z.string().optional(),
  website: z.string().optional(),
  whatsapp: z.string().optional(),
})

export const UpdateShopBodySchema = z.object({
  name: z.string().min(3),
  about: z.string().min(10),
  aboutSeller: z.string().min(10),

  daysOfActivity: z.array(
    z.enum(['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه']),
  ),

  workingHours: TimeRangeSchema,
  responseHours: TimeRangeSchema,

  socialMedia: SocialMediaSchema.optional(),

  thumbnailImage: z.string().url().optional(),

  galleryImages: z
    .array(
      z.object({
        imageUrl: z.string(),
      }),
    )
    .optional(),
})

export const UpdateShopResponseSchema = z.object({
  message: z.string(),
  cuid: z.string().cuid(),
})
