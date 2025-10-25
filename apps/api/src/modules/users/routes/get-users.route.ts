import { FastifyInstance } from "fastify"
import z from "zod"
import zodToJsonSchema from "zod-to-json-schema"

export const getUsers = async (app: FastifyInstance) => {
  const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    age: z.number().min(18),
  })

  app.post(
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
}