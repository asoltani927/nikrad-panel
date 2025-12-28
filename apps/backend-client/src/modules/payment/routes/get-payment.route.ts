import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { PaymentService } from '../service/payment.service'

const querySchema = z.object({
  Authority: z.string(),
  Status: z.string(),
  amount: z.number().optional(),
})

export const getPaymentRoute = async (app: FastifyInstance) => {
  const service = new PaymentService()

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/callback',
    schema: {
      tags: ['Payments'],
      summary: 'Zarinpal callback',
      querystring: querySchema,
    },
    handler: async (request, reply) => {
      const { Authority, Status } = request.query

      if (Status !== 'OK') {
        return reply.redirect(`${process.env.FRONTEND_URL}/payment/failed`)
      }

      const amount = 10000

      const result = await service.verifyPayment(Authority, amount)

      if (result.code === 100) {
        return reply.redirect(`${process.env.FRONTEND_URL}/payment/success?ref=${result.ref_id}`)
      }

      return reply.redirect(`${process.env.FRONTEND_URL}/payment/failed`)
    },
  })
}
