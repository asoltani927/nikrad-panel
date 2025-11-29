import { FastifyInstance } from 'fastify'
import { postNeedRoute } from './routes/post-need.route'
import { getNeedRoute } from './routes/get-need.route'
import { deleteNeedRoute } from './routes/delete-need.route'
import { putNeedRoute } from './routes/put-need.route'

export async function needsModule(app: FastifyInstance) {
  app.register(
    async (needsApp) => {
      needsApp.register(postNeedRoute)
      needsApp.register(getNeedRoute)
      needsApp.register(deleteNeedRoute)
      needsApp.register(putNeedRoute)
    },
    { prefix: '/needs' },
  )
}
