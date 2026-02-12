import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

export const GetCartResponseSchema = z.object({
  cart: z
    .object({
      totalAmount: z.number(),
    })
    .nullable(),
})

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
      },
    },

    handler: async (request, reply) => {
      if (!request.user) {
        return reply
          .status(401)
          .send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id } = request.user

      const cart = await app.dokamerce.cart.get({
        customerId: id,
      })

      return reply.status(200).send({
        cart: cart ?? null,
      })
    },
  })
}
