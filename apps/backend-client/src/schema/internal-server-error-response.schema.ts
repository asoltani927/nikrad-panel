import z from "zod";


export const InternalServerErrorResponseSchema = z.object({
  error: z.string(),
})