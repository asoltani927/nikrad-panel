import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { UnauthorizedResponseSchema } from '@/schema/unauthorized-response.schema'
import { BadRequestResponseSchema } from '@/schema/bad-request-response.schema'

export const finalizeCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/finalize',
    preHandler: [authMiddleware],

    schema: {
      tags: ['carts'],
      summary: 'Finalize cart and create order',
      description:
        'Finalizes the authenticated user cart and converts it into an order',

      response: {
        200: z.object({
          message: z.string(),
          orderId: z.string().optional(),
        }),
        401: UnauthorizedResponseSchema,
        400: BadRequestResponseSchema,
        409: z.object({
          message: z.string(), // e.g. Cart already finalized
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

      const result = await app.dokamerce.orders.finalize({
        customerId,
      })

      if (!result) {
        return reply.status(400).send({
          message: 'Cart is empty or cannot be finalized',
        })
      }

      return reply.status(200).send({
        message: 'Cart finalized successfully',
        orderId: result.id,
      })
    },
  })
}
