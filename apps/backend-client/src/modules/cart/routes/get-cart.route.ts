import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'
import { GetCartResponseSchema } from '../schema'
import { InternalServerErrorResponseSchema } from '@/schema/internal-server-error-response.schema'

// TypeScript type inference
export type GetCartResponse = z.infer<typeof GetCartResponseSchema>;
export const getCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    preHandler: [authMiddleware],

    schema: {
      tags: ['carts'],
      summary: 'Get authenticated user cart',
      description: 'Returns the cart for the authenticated user',

      response: {
        200: GetCartResponseSchema,
        401: UnauthorizedResponseSchema,
        500: InternalServerErrorResponseSchema,
      }
    },

    handler: async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }
      const { id } = request.user
      try {
        const cart = await app.dokamerce.cart.get({
          customerId: id,
          withAddress: true,
          withItems: true,
        })
        console.log('Cart:', cart)

        return reply.status(200).send({
          cart: cart ?? null,
        })
      } catch (err) {
        console.error('Error fetching cart:', err)
        return reply.status(500).send({ error: 'Failed to fetch cart' })
      }
    },
  })
}
