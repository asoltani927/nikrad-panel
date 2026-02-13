import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'

export const updateCartItemRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PATCH',
    url: '/item/:id',
    preHandler: [authMiddleware],

    schema: {
      tags: ['carts'],
      summary: 'Update cart item',
      description:
        'Updates quantity, shipping or address of a cart item for the authenticated user',

      params: z.object({
        id: z.string().min(1),
      }),

      body: z
        .object({
          quantity: z.number().int().min(1).optional(),
          addressId: z.string().min(1).optional(),
          shippingId: z.string().min(1).optional(),
        })
        .refine(
          (data) =>
            data.quantity !== undefined ||
            data.addressId !== undefined ||
            data.shippingId !== undefined,
          {
            message: 'At least one field must be provided',
          },
        ),

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

      const { id: customerId } = request.user
      const { id: cartItemId } = request.params
      const body = request.body

      const result = await app.dokamerce.cart.update({
        customerId,
        cartItemId,
        data: body,
      })

      if (!result) {
        return reply.status(404).send({
          message: 'Cart item not found',
        })
      }

      return reply.status(200).send({
        message: 'Item updated successfully',
      })
    },
  })
}
