import { FastifyInstance } from 'fastify'
import { getBrandsRoute } from './routes/get-brands.route'

export async function brandsModule(app: FastifyInstance) {
  app.register(
    async (brandsApp) => {
      brandsApp.register(getBrandsRoute)
    },
    { prefix: '/brands' },
  )
}
