import { FastifyInstance } from 'fastify'
import { getCustomFieldsRoute } from './routes/get-custom-fields.route'

export async function customFieldsModule(app: FastifyInstance) {
  app.register(
    async (app) => {
      app.register(getCustomFieldsRoute)
    },
    { prefix: '/custom-fields' },
  )
}
