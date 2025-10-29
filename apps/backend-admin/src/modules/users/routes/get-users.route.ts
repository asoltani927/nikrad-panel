import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import z from 'zod'

export const getUsers = async (app: FastifyInstance) => {
  const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    age: z.number().min(18),
  })

  // TODO: no need to zodToJsonSchema
  app.post(
    '/users',
    {
      preHandler: [authMiddleware],
      schema: {
        body: createUserSchema,
        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
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
