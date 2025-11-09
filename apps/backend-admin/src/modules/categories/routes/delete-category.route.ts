import { Messages } from '@/constants/messages'
import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteCategoryRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['categories'],
      summary: 'Delete a category by ID',
      params: z.object({
        id: z.coerce.number(),
      }),
      response: {
        200: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params

      const isExisted = await app.prisma.category.findUnique({ where: { id } })
      if (!isExisted) {
        return reply.status(404).send({ message: Messages.category.NOT_FOUND })
      }

      await app.prisma.category.delete({ where: { id } })

      return reply.status(200).send({ message: Messages.category.DELETED_SUCCESS })
    },
  })
}
