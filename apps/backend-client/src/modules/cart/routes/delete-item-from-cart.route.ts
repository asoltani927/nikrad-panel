import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'
import { InternalServerErrorResponseSchema } from '@/schema/internal-server-error-response.schema'
import { NotFoundResponseSchema } from '@/schema/not-found-response.schema'

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
        404: NotFoundResponseSchema,
        500: InternalServerErrorResponseSchema,
      },
    },

    handler: async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id: customerId } = request.user
      const { id } = request.params

      try {
        const result = await app.dokamerce.cart.remove({ cartItemId: id, customerId })

        if (!result) {
          return reply.status(404).send({
            message: 'Cart item not found',
          })
        }

        return reply.status(200).send({
          message: 'Item deleted successfully',
        })
      } catch (error) {
        console.error('Error removing item to cart:', error)
        return reply.status(500).send({ error: 'Failed to remove item to cart' })
      }
    },
  })
}
