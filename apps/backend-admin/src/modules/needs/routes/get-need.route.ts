import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

const needSchema = z.object({
  title: z.string(),
  categoryId: z.number(),
  product: z.number(),
  provinceCode: z.string(),
  city: z.string(),
  priority: z.number(),
  deliveryDate: z.date(),
})

const NeedResponseSchema = z.object({
  need: needSchema,
})

export const getNeedRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['needs'],
      summary: 'Get need by ID',
      params: paramsSchema,
      response: {
        200: NeedResponseSchema,
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params

      const need = await app.prisma.need.findUnique({
        where: { id },
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

      if (!need) {
        return reply.status(404).send({ message: 'Need not found' })
      }

      return reply.status(200).send(NeedResponseSchema.parse({ need }))
    },
  })
}
