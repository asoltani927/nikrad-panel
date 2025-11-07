import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const needsSchema = z.object({
  title: z.string(),
  categoryId: z.number(),
  product: z.number(),
  provinceCode: z.string(),
  city: z.string(),
  priority: z.number(),
  deliveryDate: z.date(),
})

const NeedsResponseSchema = z.object({
  needs: z.array(needsSchema),
})

export const getNeedsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['needs'],
      summary: 'Get all needs',
      response: {
        200: NeedsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const needs = await app.prisma.need.findMany({
        select: {
          title: true,
          categoryId: true,
          product: true,
          provinceCode: true,
          city: true,
          priority: true,
          deliveryDate: true,
        },
      })
      return reply.status(200).send(NeedsResponseSchema.parse({ needs }))
    },
  })
}
