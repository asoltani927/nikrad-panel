import { FastifyInstance } from 'fastify'
import { getCountriesRoute } from './routes/get-countries.route'

export async function countriesModule(app: FastifyInstance) {
  app.register(getCountriesRoute, {
    prefix: '/countries',
  })
}
