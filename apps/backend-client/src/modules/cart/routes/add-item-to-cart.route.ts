import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

export const addItemToCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
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
      const { id } = request.user

      const data = []

      data.push({
        addressId: '',
        productId: '',
        quantity: 1,
        sellerId: '',
        shippingId: '',
        variantId: '',
      })

      const result = await app.dokamerce.cart.addToCart({
        customerId: id,
        data: data,
      })

      return reply.status(200).send({ message: 'Item deleted successfully' })
    },
  })
}
