import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'
import { provincesModule } from './provinces'

export async function initialModules(app: FastifyInstance) {
  await countriesModule(app)
  await usersModule(app)
  await provincesModule(app)
}
