import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

const SuggestionResponseSchema = z.object({
  cuid: z.string(),
  price: z.string(),

  need: z.object({
    cuid: z.string(),
    title: z.string(),
    status: z.string(),
    user: z.string().nullable(),
  }),

  createdBy: z.object({
    name: z.string(),
    phone: z.string().nullable(),
  }),

  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.string(),
})

export const getSuggestionRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:cuid',
    preHandler: [authMiddleware],
    schema: {
      tags: ['suggestions'],
      summary: 'Get User Suggestion by CUID',
      params: z.object({
        cuid: z.string().cuid(),
      }),
      response: {
        200: SuggestionResponseSchema,
        404: z.object({ message: z.string() }),
        403: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { cuid } = request.params
      const userId = parseInt(request.user.id)

      const suggestion = await app.prisma.suggestions.findUnique({
        where: { cuid },
        select: {
          cuid: true,
          price: true,
          createdById: true,

          Need: {
            select: {
              cuid: true,
              title: true,
              status: true,
              createdBy: {
                select: { name: true },
              },
            },
          },

          createdBy: {
            select: {
              name: true,
              phone: true,
            },
          },

          createdAt: true,
          updatedAt: true,
          status: true,
        },
      })

      if (!suggestion) {
        return reply.status(404).send({ message: Messages.suggestions.NOT_FOUND })
      }

      if (suggestion.createdById !== userId) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }

      const normalized = {
        cuid: suggestion.cuid,
        price: suggestion.price.toString(),

        need: {
          cuid: suggestion.Need.cuid,
          title: suggestion.Need.title,
          status: suggestion.Need.status,
          user: suggestion.Need.createdBy?.name ?? null,
        },

        createdBy: suggestion.createdBy,
        createdAt: suggestion.createdAt,
        updatedAt: suggestion.updatedAt,
        status: suggestion.status,
      }

      return reply.status(200).send(SuggestionResponseSchema.parse(normalized))
    },
  })
}
