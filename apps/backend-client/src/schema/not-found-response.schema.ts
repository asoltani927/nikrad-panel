import z from "zod";


export const NotFoundResponseSchema = z.object({
  message: z.string(),
})