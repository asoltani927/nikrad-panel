import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export async function setup(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: { title: 'My API', version: '1.0.0' },
    },
  })
  await app.register(swaggerUi, { routePrefix: '/docs' })
}
