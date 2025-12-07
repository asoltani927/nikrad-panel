import { FastifyInstance } from 'fastify'
import { countriesModule } from './countries'
import { usersModule } from './users'
import { provincesModule } from './provinces'
import { needsModule } from './needs'
import { categoriesModule } from './categories'
import { customFieldsModule } from './custom-fields'
import { suggestionsModule } from './suggestions'
import { cacheModule } from './settings/caches'
import redisPlugin from '@/plugins/redis'

export async function initialModules(app: FastifyInstance) {
  await app.register(redisPlugin)
  await countriesModule(app)
  await usersModule(app)
  await provincesModule(app)
  await needsModule(app)
  await categoriesModule(app)
  await customFieldsModule(app)
  await suggestionsModule(app)
  await cacheModule(app)
}
