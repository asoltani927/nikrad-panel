import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'

export async function initialModules(app: FastifyInstance) {
  await countriesModule(app)
  await usersModule(app)
}
