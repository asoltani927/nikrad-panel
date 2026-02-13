import { authMiddleware } from '@/middlewares'
import { AuthenticatedPayload } from '@/types/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

// Simple in-memory cache (for demonstration)
const userCache = new Map<string, any>()
const CACHE_TTL = 60 * 1000 // 60 seconds

// Schema for successful response
const AuthenticatedUserSchema = z.object({
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

const AuthenticatedUserResponseSchema = z.object({
  success: z.boolean(),
  user: AuthenticatedUserSchema,
})

const ErrorResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
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
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
    },

    preHandler: [authMiddleware],

    handler: async (request, reply) => {
      try {
        const payload = request.user as unknown as AuthenticatedPayload
        const customer = payload?.customer ?? null

        if (!customer) {
          return reply.status(404).send({
            success: false,
            message: 'User not found',
          })
        }

        // Check cache
        const cached = userCache.get(customer.id)
        const now = Date.now()
        if (cached && now - cached.timestamp < CACHE_TTL) {
          return reply.status(200).send(cached.data)
        }

        const userData = {
          success: true,
          user: {
            id: customer.id,
            username: customer.username,
            fullName: customer.fullName,
            telephoneNumbers: customer.telephoneNumbers,
          },
        }

        // Save to cache
        userCache.set(customer.id, {
          data: userData,
          timestamp: now,
        })

        return reply.status(200).send(userData)
      } catch (error) {
        console.error('Error fetching authenticated user:', error)
        return reply.status(500).send({
          success: false,
          message: 'Internal server error',
        })
      }
    },
  })
}
