import { Messages } from '@/constants/messages'
import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteNeedRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:cuid',
    preHandler: [authMiddleware],
    schema: {
      tags: ['needs'],
      summary: 'Delete a need by CUID (owner only)',
      params: z.object({
        cuid: z.string().cuid(),
      }),
      response: {
        200: z.object({ message: z.string() }),
        403: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { cuid } = request.params
      const userId = request.authenticatedUser?.user?.id

      if (!userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const need = await app.prisma.need.findUnique({
        where: { cuid },
        select: { createdById: true, deleted: true },
      })

      if (!need || need.deleted) {
        return reply.status(404).send({ message: Messages.needs.NOT_FOUND })
      }

      if (need.createdById !== userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      await app.prisma.need.update({
        where: { cuid },
        data: { deleted: true, deletedAt: new Date(), deletedById: userId },
      })

      return reply.status(200).send({ message: Messages.needs.DELETED_SUCCESS })
    },
  })
}
