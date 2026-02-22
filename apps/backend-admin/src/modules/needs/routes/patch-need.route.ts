import { Messages } from '@/constants/messages'
import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const patchNeedRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PATCH',
    url: '/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['needs'],
      summary: 'Update need status',
      params: z.object({
        id: z.coerce.number(),
      }),
      body: z.object({
        status: z.enum(['approve', 'draft', 'reject']),
      }),
      response: {
        200: z.object({
          message: z.string(),
          need: z.object({
            id: z.number(),
            status: z.string(),
          }),
        }),
        404: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { id } = request.params
      const { status } = request.body

      const isExisted = await app.prisma.need.findUnique({ where: { id } })
      if (!isExisted) {
        return reply.status(404).send({ message: Messages.needs.NOT_FOUND })
      }

      const updatedNeed = await app.prisma.need.update({
        where: { id },
        data: { status },
        select: {
          id: true,
          status: true,
        },
      })

      return reply.status(200).send({
        message: Messages.needs.UPDATED_STATUS,
        need: updatedNeed,
      })
    },
  })
}
