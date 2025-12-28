import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

export const deleteSuggestionRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:cuid',
    preHandler: [authMiddleware],

    schema: {
      tags: ['suggestions'],
      summary: 'Delete a suggestion',
      params: z.object({
        cuid: z.string(),
      }),
      response: {
        200: z.object({ message: z.string() }),
        403: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { cuid } = request.params

      if (!request.user) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }
      const userId = request.user.id

      const suggestion = await app.prisma.suggestions.findUnique({
        where: { cuid },
        select: {
          id: true,
          cuid: true,
          createdById: true,
          deleted: true,
        },
      })

      if (!suggestion) {
        return reply.status(404).send({ message: Messages.suggestions.NOT_FOUND })
      }

      if (suggestion.deleted) {
        return reply.status(404).send({ message: Messages.suggestions.NOT_FOUND })
      }

      if (suggestion.createdById !== userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      await app.prisma.suggestions.update({
        where: { cuid },
        data: {
          deleted: true,
          deletedAt: new Date(),
          deletedById: userId,
        },
      })

      return reply.status(200).send({ message: Messages.suggestions.DELETED_SUCCESS })
    },
  })
}
