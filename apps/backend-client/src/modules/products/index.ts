import { FastifyInstance } from 'fastify'
import { postProductRoute } from './routes/post-product.route'
import { getProductsRoute } from './routes/get-products.route'
import { getProductByIdRoute } from './routes/get-product.route'
import { getProductBySellerIdRoute } from './routes/get-products-seller.route'
import { putProductRoute } from './routes/put-product.route'

export async function productsModule(app: FastifyInstance) {
  app.register(
    async (productsApp) => {
      productsApp.register(postProductRoute)
      productsApp.register(getProductsRoute)
      productsApp.register(getProductByIdRoute)
      productsApp.register(getProductBySellerIdRoute)
      productsApp.register(putProductRoute)
    },
    { prefix: '/products' },
  )
}
