import { authMiddleware } from '@/middlewares'
import { AuthenticatedPayload } from '@/types/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const AuthenticatedUserResponseSchema = z.object({
  success: z.boolean(),
  user: z
    .object({
      id: z.string(),
      username: z.string(),
      fullName: z.string().nullable(),
      telephoneNumbers: z
        .array(
          z.object({
            id: z.string(),
            number: z.string(),
            targets: z.array(z.string()),
          }),
        )
        .optional(),
    })
    .optional(),
  message: z.optional(z.string()),
})

export const getAuthMeRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/me',
    schema: {
      tags: ['auth'],
      summary: 'Get authenticated user',
      response: {
        200: AuthenticatedUserResponseSchema,
        404: AuthenticatedUserResponseSchema, // اضافه کردن اسکیمای 404
      },
    },

    preHandler: [authMiddleware],

    handler: async (request, reply) => {
      // TODO: add telephone numbers to customer info @reza (Done)
      // add in authMiddleware line 31
      const payload = request.user as unknown as AuthenticatedPayload
      const customer = payload?.customer ?? null

      if (!customer) {
        return reply.status(404).send({
          success: false,
          message: 'User not found',
        })
      }

      return reply.status(200).send({
        success: true,
        user: {
          id: customer.id,
          username: customer.username,
          fullName: customer.fullName,
          telephoneNumbers: customer.telephoneNumbers,
        },
      })
    },
  })
}