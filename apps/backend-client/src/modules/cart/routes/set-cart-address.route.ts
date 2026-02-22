import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'
import { NotFoundResponseSchema } from '@/schema/not-found-response.schema'

export const setCartAddressRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/address/:id',
    preHandler: [authMiddleware],

    schema: {
      tags: ['carts'],
      summary: 'Set cart address',
      description:
        'Assigns an address to the authenticated user cart',
      params: z.object({
        id: z.string().min(1),
      }),
      response: {
        200: z.object({
          message: z.string(),
        }),
        401: UnauthorizedResponseSchema,
        404: NotFoundResponseSchema,
      },
    },

    handler: async (request, reply) => {
      if (!request.user) {
        return reply
          .status(401)
          .send(UnauthorizedResponseSchema.parse({ error: 'Unauthorized' }))
      }

      const { id: customerId } = request.user
      const { id: addressId } = request.params

      const result = await app.dokamerce.cart.setAddress({
        customerId,
        addressId,
      })

      if (!result) {
        return reply.status(404).send({
          message: 'Address not found or cannot be assigned',
        })
      }

      return reply.status(200).send({
        message: 'Cart address set successfully',
      })
    },
  })
}
