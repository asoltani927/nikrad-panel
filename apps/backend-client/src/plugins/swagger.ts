import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export async function setup(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: { title: 'My API', version: '1.0.0' },
      servers: [],
      components: {
        securitySchemes: {
          bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Bearer token for authentication',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  })
  await app.register(swaggerUi, { routePrefix: '/docs' })
}
