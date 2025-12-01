import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { createPaginationMeta } from '@/utils/pagination'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

const SuggestionSchema = z.object({
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

const SuggestionsResponseSchema = z.object({
  suggestions: z.array(SuggestionSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    links: z.record(z.string(), z.string().nullable()).optional(),
  }),
})

const GetSuggestionsQuery = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export const getSuggestionsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['suggestions'],
      summary: 'Get User Suggestions',
      querystring: GetSuggestionsQuery,
      response: {
        200: SuggestionsResponseSchema,
        403: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      try {
        const userId = (request.user as { id: number })?.id
        if (!userId) {
          return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
        }

        const { page, limit } = GetSuggestionsQuery.parse(request.query)
        const skip = (page - 1) * limit

        const [suggestions, total] = await Promise.all([
          app.prisma.suggestions.findMany({
            where: {
              deleted: false,
              createdById: userId,
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: {
              cuid: true,
              price: true,

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
          }),

          app.prisma.suggestions.count({
            where: { deleted: false, createdById: userId },
          }),
        ])

        const normalized = suggestions.map((s) => ({
          cuid: s.cuid,
          price: s.price.toString(),

          need: {
            cuid: s.Need.cuid,
            title: s.Need.title,
            status: s.Need.status,
            user: s.Need.createdBy?.name ?? null,
          },

          createdBy: s.createdBy,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          status: s.status,
        }))

        const meta = createPaginationMeta(total, page, limit, request)

        return reply.status(200).send(
          SuggestionsResponseSchema.parse({
            suggestions: normalized,
            total,
            page,
            limit,
            meta,
          }),
        )
      } catch (error) {
        console.log(error)
      }
    },
  })
}
