import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'
import { provincesModule } from './provinces'
import { needsModule } from './needs'
import { categoriesModule } from './categories'
import { customFieldsModule } from './custom-fields'
import { suggestionsModule } from './suggestions'

export async function initialModules(app: FastifyInstance) {
  await countriesModule(app)
  await usersModule(app)
  await provincesModule(app)
  await needsModule(app)
  await categoriesModule(app)
  await customFieldsModule(app)
  await suggestionsModule(app)
}
