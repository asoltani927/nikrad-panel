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

const NeedResponseSchema = z.object({
  need: needsSchema,
})

export const postNeedRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['needs'],
      summary: 'Create new need',
      body: needsSchema, 
      response: {
        201: NeedResponseSchema, 
      },
    },
    handler: async (request, reply) => {
      const data = request.body

      const need = await app.prisma.need.create({
        data,
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

      return reply.status(201).send(NeedResponseSchema.parse({ need }))
    },
  })
}
