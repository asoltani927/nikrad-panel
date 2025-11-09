import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'
import { customFieldsModule } from './custom-fields'

export async function initialModules(app: FastifyInstance) {
  await countriesModule(app)
  await usersModule(app)
  await customFieldsModule(app)
}
