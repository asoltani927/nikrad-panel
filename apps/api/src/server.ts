import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

async function start() {
  const fastify = Fastify({ logger: true })

  await fastify.register(swagger, {
    openapi: {
      info: { title: 'My API', version: '1.0.0' },
    },
  })
  await fastify.register(swaggerUi, { routePrefix: '/docs' })

  const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    age: z.number().min(18),
  })

  fastify.post(
    '/users',
    {
      schema: {
        body: zodToJsonSchema(createUserSchema, 'CreateUserBody'),
        response: {
          200: zodToJsonSchema(
            z.object({
              success: z.boolean(),
              message: z.string(),
            }),
            'CreateUserResponse',
          ),
        },
      },
    },
    async (req, reply) => {
      const parsed = createUserSchema.safeParse(req.body)

      if (!parsed.success) {
        return reply.status(400 as any).send({
          success: false,
          message: parsed.error.issues.map((e) => e.message).join(', '),
        })
      }

      const { name, email, age } = parsed.data
      return { success: true, message: `User ${name} (${age}) created.` }
    },
  )

  await fastify.listen({ port: 3000 })
  console.log('✅ Server ready at http://localhost:3000')
  console.log('📘 Swagger docs at http://localhost:3000/docs')
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
