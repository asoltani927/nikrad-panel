import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

export const addItemToCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['carts'],
      summary: 'Add item to cart',
      description: 'Adds a product item to the authenticated user cart',

      body: z.object({
        addressId: z.string().min(1),
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
        sellerId: z.string().min(1),
        shippingId: z.string().min(1),
        variantId: z.string().min(1),
      }),

      response: {
        200: z.object({
          message: z.string(),
        }),
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
      const body = request.body

      await app.dokamerce.cart.addToCart({
        customerId: id,
        data: [
          {
            addressId: body.addressId,
            productId: body.productId,
            quantity: body.quantity,
            sellerId: body.sellerId,
            shippingId: body.shippingId,
            variantId: body.variantId,
          },
        ],
      })

      return reply.status(200).send({
        message: 'Item added successfully',
      })
    },
  })
}
