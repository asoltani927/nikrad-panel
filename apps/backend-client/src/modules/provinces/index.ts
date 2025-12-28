import { FastifyInstance } from 'fastify'
import { getProvincesRoute } from './routes/get-provinces.route'

export async function provincesModule(app: FastifyInstance) {
  app.register(getProvincesRoute, {
    prefix: '/provinces',
  })
}
