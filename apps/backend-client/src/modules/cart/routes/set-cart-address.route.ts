import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

export const setCartAddressRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/address/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['carts'],
      summary: 'Delete a product item from cart by id',
      params: z.object({ id: z.string() }),
      // response: {
      //   200: z.object({ message: z.string() }),
      //   403: z.object({ message: z.string() }),
      //   404: z.object({ message: z.string() }),
      // },
    },
    handler: async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }
      const { id: customerId } = request.user
      const { id: addressId } = request.params as { id: string }

      const result = await app.dokamerce.cart.setAddress({
        customerId: customerId,
        addressId: addressId,
      })

      return reply.status(200).send({ message: 'Item deleted successfully' })
    },
  })
}
