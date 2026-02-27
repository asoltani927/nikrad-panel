import { FastifyInstance } from 'fastify'
import { getCategoriesRoute } from './routes/get-categories.route'
import { getProductCategoriesRoute } from './routes/get-product-categories.route'

export async function categoriesModule(app: FastifyInstance) {
  app.register(
    async (categoriesApp) => {
      categoriesApp.register(getCategoriesRoute)
      categoriesApp.register(getProductCategoriesRoute)
    },
    { prefix: '/categories' },
  )
}
