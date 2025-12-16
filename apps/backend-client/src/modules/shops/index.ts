import { FastifyInstance } from 'fastify'
import { getShopsRoute } from './routes/get-shops.route'
import { getShopByCuidRoute } from './routes/get-shop.route'
import { postShopRoute } from './routes/post-shop.route'

export async function shopsModule(app: FastifyInstance) {
  app.register(
    async (shopsApp) => {
      shopsApp.register(getShopsRoute)
      shopsApp.register(getShopByCuidRoute)
      shopsApp.register(postShopRoute)
    },
    { prefix: '/shops' },
  )
}
