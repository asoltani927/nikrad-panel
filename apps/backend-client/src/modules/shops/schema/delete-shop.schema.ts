import { z } from 'zod'

export const DeleteShopParamsSchema = z.object({
  cuid: z.string().cuid(),
})

export const DeleteShopResponseSchema = z.object({
  message: z.string(),
  cuid: z.string().cuid(),
})
