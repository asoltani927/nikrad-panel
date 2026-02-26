import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

const paramsSchema = z.object({
  id: z.string()
})

const needSchema = z.object({
  cuid: z.string().cuid(),
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
    preHandler: [authMiddleware],
    schema: {
      tags: ['needs'],
      summary: 'Get need by CUID (owner only)',
      params: paramsSchema,
      response: {
        200: NeedResponseSchema,
        403: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params
      const userId = request.authenticatedUser.user?.id

      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const need = await app.prisma.need.findUnique({
        where: { cuid: id, deleted: false },
        select: {
          cuid: true,
          title: true,
          categoryId: true,
          product: true,
          provinceCode: true,
          city: true,
          priority: true,
          deliveryDate: true,
          createdById: true,
        },
      })

      if (!need) {
        return reply.status(404).send({ message: Messages.needs.NOT_FOUND })
      }

      if (need.createdById !== userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      return reply.status(200).send(NeedResponseSchema.parse({ need }))
    },
  })
}
