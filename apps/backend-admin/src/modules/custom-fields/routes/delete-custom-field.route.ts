import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

const DeleteCustomFieldParamsSchema = z.object({
  id: z.coerce.number().min(1),
})

export const deleteCustomFieldRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    preHandler: authMiddleware,
    schema: {
      tags: ['customFields'],
      summary: 'Soft delete a custom field',
      params: DeleteCustomFieldParamsSchema,
      response: {
        200: z.object({ message: z.string() }),
        401: UnauthorizedResponseSchema,
        404: z.object({ error: z.literal('CustomField not found') }),
      },
    },
    handler: async (request, reply) => {
      if (!request.user) {
        return reply
          .status(401)
          .send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id } = request.params
      const { id: userId } = request.user

      const existing = await app.prisma.customField.findUnique({
        where: { id },
      })

      if (!existing || existing.deleted) {
        return reply.status(404).send({ error: 'CustomField not found' })
      }

      await app.prisma.customField.update({
        where: { id },
        data: {
          deleted: true,
          deletedById: userId,
          deletedAt: new Date(),
        },
      })

      return reply.status(200).send({ message: 'CustomField soft deleted' })
    },
  })
}
