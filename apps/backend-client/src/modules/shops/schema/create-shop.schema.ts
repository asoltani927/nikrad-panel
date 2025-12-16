import z from 'zod'

const TimeRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
})

const SocialMediaSchema = z.object({
  instagram: z.string().url().optional(),
  telegram: z.string().url().optional(),
  website: z.string().url().optional(),
  whatsapp: z.string().optional(),
})

export const CreateShopBodySchema = z.object({
  name: z.string().min(3),
  categoryId: z.number(),
  aboutShop: z.string().min(10),
  aboutSeller: z.string().min(10),

  daysOfActivity: z.array(
    z.enum(['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']),
  ),

  workingHours: TimeRangeSchema,
  responseHours: TimeRangeSchema,

  socialMedia: SocialMediaSchema.optional(),

  thumbnailImage: z.string().url().optional(),

  galleryImages: z
    .array(
      z.object({
        imageUrl: z.string().url(),
      }),
    )
    .optional(),
})

export const CreateShopResponseSchema = z.object({
  cuid: z.string().cuid(),
  name: z.string(),
  message: z.string(),
})
