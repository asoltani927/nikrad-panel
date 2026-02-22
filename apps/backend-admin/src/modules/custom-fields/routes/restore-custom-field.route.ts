import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

const RestoreCustomFieldParamsSchema = z.object({
  id: z.coerce.number().min(1),
})

export const restoreCustomFieldRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PATCH',
    url: '/:id/restore',
    preHandler: authMiddleware,
    schema: {
      tags: ['customFields'],
      summary: 'Restore a soft-deleted custom field',
      params: RestoreCustomFieldParamsSchema,
      response: {
        200: z.object({ message: z.string() }),
        401: UnauthorizedResponseSchema,
        404: z.object({ error: z.literal('CustomField not found or not deleted') }),
      },
    },
    handler: async (request, reply) => {
      if (!request.user) {
        return reply
          .status(401)
          .send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id } = request.params

      const existing = await app.prisma.customField.findUnique({
        where: { id },
      })

      if (!existing || !existing.deleted) {
        return reply
          .status(404)
          .send({ error: 'CustomField not found or not deleted' })
      }

      await app.prisma.customField.update({
        where: { id },
        data: {
          deleted: false,
          deletedById: null,
          deletedAt: null,
        },
      })

      return reply.status(200).send({ message: 'CustomField restored successfully' })
    },
  })
}
