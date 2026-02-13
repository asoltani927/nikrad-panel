import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

export const deleteItemFromCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    preHandler: [authMiddleware],

    schema: {
      tags: ['carts'],
      summary: 'Delete item from cart',
      description: 'Removes a cart item by its id for the authenticated user',

      params: z.object({
        id: z.string().min(1),
      }),

      response: {
        200: z.object({
          message: z.string(),
        }),
        401: UnauthorizedResponseSchema,
        404: z.object({
          message: z.string(),
        }),
      },
    },

    handler: async (request, reply) => {
      if (!request.user) {
        return reply
          .status(401)
          .send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id } = request.params

      const result = await app.dokamerce.cart.remove({ id })

      if (!result) {
        return reply.status(404).send({
          message: 'Cart item not found',
        })
      }

      return reply.status(200).send({
        message: 'Item deleted successfully',
      })
    },
  })
}
