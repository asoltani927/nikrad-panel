import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'
import { customFieldsModule } from './custom-fields'
import { needsModule } from './needs'
import { provincesModule } from './provinces'
import { suggestionsModule } from './suggestions'
import { categoriesModule } from './categories'
import { paymentsModule } from './payment'
import { shopsModule } from './shops'
import { productsModule } from './products'
import { authModule } from './auth'
import { cartModule } from './cart'
import { newsletterModule } from './newsletter'
import { blogsModule } from './blog'
import { brandsModule } from './brands'

export async function initialModules(app: FastifyInstance) {
  await authModule(app)
  await countriesModule(app)
  await usersModule(app)
  await customFieldsModule(app)
  await needsModule(app)
  await provincesModule(app)
  await suggestionsModule(app)
  await categoriesModule(app)
  await paymentsModule(app)
  await shopsModule(app)
  await productsModule(app)
  await cartModule(app)
  await newsletterModule(app)
  await blogsModule(app)
  await brandsModule(app)
}
