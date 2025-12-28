import { FastifyInstance } from 'fastify'
import { getNeedsRoute } from './routes/get-needs.route'
import { postNeedRoute } from './routes/post-need.route'
import { getNeedRoute } from './routes/get-need.route'
import { deleteNeedRoute } from './routes/delete-need.route'
import { putNeedRoute } from './routes/put-need.route'
import { patchNeedRoute } from './routes/patch-need.route'

export async function needsModule(app: FastifyInstance) {
  app.register(
    async (needsApp) => {
      needsApp.register(getNeedsRoute)
      needsApp.register(postNeedRoute)
      needsApp.register(getNeedRoute)
      needsApp.register(deleteNeedRoute)
      needsApp.register(putNeedRoute)
      needsApp.register(patchNeedRoute)
    },
    { prefix: '/needs' },
  )
}
