import { FastifyInstance } from 'fastify'
import { postPaymentRoute } from './routes/post-payment.route'
import { getPaymentRoute } from './routes/get-payment.route'

export const paymentsModule = async (app: FastifyInstance) => {
  app.register(
    async (paymentsApp) => {
      paymentsApp.register(postPaymentRoute)
      paymentsApp.register(getPaymentRoute)
    },
    { prefix: '/payments' },
  )
}
