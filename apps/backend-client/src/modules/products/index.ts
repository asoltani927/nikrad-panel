import { FastifyInstance } from 'fastify'
import { postProductRoute } from './routes/post-product.route'
import { getProductsRoute } from './routes/get-products.route'
import { getProductByIdRoute } from './routes/get-product.route'

export async function productsModule(app: FastifyInstance) {
  app.register(
    async (productsApp) => {
      productsApp.register(postProductRoute)
      productsApp.register(getProductsRoute)
      productsApp.register(getProductByIdRoute)
    },
    { prefix: '/products' },
  )
}
