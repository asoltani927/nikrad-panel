import { FastifyInstance } from "fastify"
import { postProductRoute } from "./routes/post-product.route"
import { getProductsRoute } from "./routes/get-products.route"

export async function productsModule(app: FastifyInstance) {
  app.register(
    async (productsApp) => {
      productsApp.register(postProductRoute)
      productsApp.register(getProductsRoute)
    },
    { prefix: '/products' },
  )
}