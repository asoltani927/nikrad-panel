import { FastifyInstance } from 'fastify'
import { getCategoriesRoute } from './routes/get-categories.route'
import { getCategoryBySlugRoute } from './routes/get-category.route'

export async function categoriesModule(app: FastifyInstance) {
  app.register(
    async (categoriesApp) => {
      categoriesApp.register(getCategoriesRoute)
      categoriesApp.register(getCategoryBySlugRoute)
    },
    { prefix: '/categories' },
  )
}
