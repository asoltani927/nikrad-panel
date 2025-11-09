import { FastifyInstance } from 'fastify'
import { getCategoriesRoute } from './routes/get-categories.route'
import { getCategoryBySlugRoute } from './routes/get-category.route'
import { postCategoryRoute } from './routes/post-category.route'
import { putCategoryRoute } from './routes/put-category.route'
import { deleteCategoryRoute } from './routes/delete-category.route'

export async function categoriesModule(app: FastifyInstance) {
  app.register(
    async (needsApp) => {
      needsApp.register(getCategoriesRoute)
      needsApp.register(getCategoryBySlugRoute)
      needsApp.register(postCategoryRoute)
      needsApp.register(putCategoryRoute)
      needsApp.register(deleteCategoryRoute)
    },
    { prefix: '/categories' },
  )
}
