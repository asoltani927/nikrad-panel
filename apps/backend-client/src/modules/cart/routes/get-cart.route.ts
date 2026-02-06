import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const GetCartResponseSchema = z.object({
  totalAmount: z.number(),
})

export const getCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['cart'],
      summary: 'Get cart items',
      response: {
        200: GetCartResponseSchema,
      },
    },

    handler: async (request, reply) => {
      const {
        customer: { id: customerId },
      } = request.user
      const cart = await app.dokamerce.cart.get({ customerId })
      return reply.status(200).send(GetCartResponseSchema.parse(cart))
    },
  })
}
