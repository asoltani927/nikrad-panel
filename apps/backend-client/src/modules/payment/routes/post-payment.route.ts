import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { PaymentService } from '../service/payment.service'

const bodySchema = z.object({
  amount: z.number(),
  orderId: z.number().optional(),
})

export const postPaymentRoute = async (app: FastifyInstance) => {
  const service = new PaymentService()

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/start',
    preHandler: [authMiddleware],
    schema: {
      tags: ['Payments'],
      summary: 'Start a payment',
      body: bodySchema,
      response: {
        200: z.object({ redirectUrl: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { amount, orderId } = request.body
      const redirectUrl = await service.startPayment(amount, request.user!.id, orderId)
      return { redirectUrl }
    },
  })
}
