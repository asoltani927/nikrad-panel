import { FastifyInstance } from 'fastify'
import { getCustomFieldsRoute } from './routes/get-custom-fields.route'
import { getDeletedCustomFieldsRoute } from './routes/get-deleted-custom-fields.route'
import { postCustomFieldRoute } from './routes/post-custom-field.route'
import { deleteCustomFieldRoute } from './routes/delete-custom-field.route'
import { putCustomFieldRoute } from './routes/put-custom-field.route'
import { restoreCustomFieldRoute } from './routes/restore-custom-field.route'

export async function customFieldsModule(app: FastifyInstance) {
  app.register(
    async (app) => {
      app.register(getCustomFieldsRoute)
      app.register(postCustomFieldRoute)
      app.register(deleteCustomFieldRoute)
      app.register(putCustomFieldRoute)
      app.register(getDeletedCustomFieldsRoute)
      app.register(restoreCustomFieldRoute)
    },
    { prefix: '/custom-fields' },
  )
}
