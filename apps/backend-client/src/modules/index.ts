import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'
import { customFieldsModule } from './custom-fields'
import { needsModule } from './needs'
import { provincesModule } from './provinces'
import { suggestionsModule } from './suggestions'
import { categoriesModule } from './categories'
import { paymentsModule } from './payment'

export async function initialModules(app: FastifyInstance) {
  await countriesModule(app)
  await usersModule(app)
  await customFieldsModule(app)
  await needsModule(app)
  await provincesModule(app)
  await suggestionsModule(app)
  await categoriesModule(app)
  await paymentsModule(app)
}
