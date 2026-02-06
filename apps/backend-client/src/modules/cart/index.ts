import { FastifyInstance } from 'fastify'
import { deleteItemFromCartRoute } from './routes/delete-item-from-cart.route'
import { getCartRoute } from './routes/get-cart.route'
import { setCartAddressRoute } from './routes/set-cart-address.route'
import { updateCartItemRoute } from './routes/update-cart-item.route'

export async function cartModule(app: FastifyInstance) {
  app.register(
    async (cartApp) => {
      cartApp.register(deleteItemFromCartRoute)
      cartApp.register(getCartRoute)
      cartApp.register(setCartAddressRoute)
      cartApp.register(updateCartItemRoute)
    },
    { prefix: '/cart' },
  )
}
