import { FastifyInstance } from 'fastify'
import { postCacheTTLRoute } from './routes/post-cache.route'
import { getCacheTTLRoute } from './routes/get-cache.route'

export async function cacheModule(app: FastifyInstance) {
  app.register(
    async (cacheApp) => {
      cacheApp.register(getCacheTTLRoute)
      cacheApp.register(postCacheTTLRoute)
    },
    { prefix: '/cache' },
  )
}
