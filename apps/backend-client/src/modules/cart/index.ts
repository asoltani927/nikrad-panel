import { FastifyInstance } from 'fastify'
import { deleteItemFromCartRoute } from './routes/delete-item-from-cart.route'
import { getCartRoute } from './routes/get-cart.route'

export async function cartModule(app: FastifyInstance) {
  app.register(
    async (cartApp) => {
      cartApp.register(deleteItemFromCartRoute)
      cartApp.register(getCartRoute)
    },
    { prefix: '/cart' },
  )
}
