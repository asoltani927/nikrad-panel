import z from "zod";


export const UnauthorizedResponseSchema = z.object({
  error: z.literal('Unauthorized'),
})