import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

async function start() {
  const fastify = Fastify({ logger: true })

  await fastify.register(swagger, {
    openapi: {
      info: { title: 'My API', version: '1.0.0' },
    },
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/api/docs',
  })

  await fastify.listen({ port: 3000 })
  console.log('🚀 Server ready on http://localhost:3000')
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
