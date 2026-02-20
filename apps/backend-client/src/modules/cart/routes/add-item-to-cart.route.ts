import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'
import { InternalServerErrorResponseSchema } from '@/schema/internal-server-error-response.schema'

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
        addressId: z.string().optional().nullable(),
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
        sellerId: z.string().min(1),
        shippingId: z.string().min(1).optional().nullable(),
        variantId: z.string().optional().nullable(),
      }),

      response: {
        200: z.object({
          message: z.string(),
        }),
        401: UnauthorizedResponseSchema,
        500: InternalServerErrorResponseSchema,
      },
    },

    handler: async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }
      const { id } = request.user
      const body = request.body
      try {
        await app.dokamerce.cart.add({
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
      } catch (error) {
        console.error('Error adding item to cart:', error)
        return reply.status(500).send({ error: 'Failed to add item to cart' })
      }
    },
  })
}
