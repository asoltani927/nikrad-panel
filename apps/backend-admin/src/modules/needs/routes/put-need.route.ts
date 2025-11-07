import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

const needSchema = z.object({
  title: z.string(),
  categoryId: z.coerce.number(),
  product: z.coerce.number(),
  provinceCode: z.string(),
  city: z.string(),
  priority: z.coerce.number(),
  deliveryDate: z.coerce.date(),
})

const NeedResponseSchema = z.object({
  need: needSchema,
})

export const putNeedRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['needs'],
      summary: 'Update a need by ID',
      params: paramsSchema,
      body: needSchema,
      response: {
        200: NeedResponseSchema,
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params
      const data = request.body

      const isExisted = await app.prisma.need.findUnique({ where: { id } })
      if (!isExisted) {
        return reply.status(404).send({ message: 'Need not found' })
      }

      const need = await app.prisma.need.update({
        where: { id },
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

      return reply.status(200).send(NeedResponseSchema.parse({ need }))
    },
  })
}
