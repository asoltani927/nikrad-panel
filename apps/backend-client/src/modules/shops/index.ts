import { FastifyInstance } from 'fastify'
import { getShopByCuidRoute } from './routes/get-shop.route'
import { postShopRoute } from './routes/post-shop.route'
import { putShopRoute } from './routes/put-shop.route'
import { deleteShopRoute } from './routes/delete-shop.route'
import { getShopsRoute } from './routes/get-shops.route'
import { getShopsByOwnerRoute } from './routes/get-shops-byOwner.route'

export async function shopsModule(app: FastifyInstance) {
  app.register(
    async (shopsApp) => {
      shopsApp.register(getShopsRoute)
      shopsApp.register(getShopByCuidRoute)
      shopsApp.register(postShopRoute)
      shopsApp.register(putShopRoute)
      shopsApp.register(deleteShopRoute)
      shopsApp.register(getShopsByOwnerRoute)
    },
    { prefix: '/shops' },
  )
}

// TODO: make a route to retrieve top sellers @reza (it is a public route without login for home page) (just fetch 10 items sorted by total sales descending) (DONE)
