import z from "zod";


export const BadRequestResponseSchema = z.object({
  message: z.string(),
})