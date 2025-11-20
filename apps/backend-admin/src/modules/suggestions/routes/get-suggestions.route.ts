import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const SuggestionResponseSchema = z.object({
  id: z.number(),
  price: z.string(),

  need: z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    user: z.string().nullable(),
  }),

  createdBy: z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string().nullable(),
  }),

  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.string(),
})

const SuggestionsResponseSchema = z.object({
  suggestions: z.array(SuggestionResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

const GetSuggestionsQuery = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export const getSuggestionsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['suggestions'],
      summary: 'Get all suggestions',
      querystring: GetSuggestionsQuery,
      response: {
        200: SuggestionsResponseSchema,
      },
    },

    handler: async (request, reply) => {
      try {
        const { page, limit } = GetSuggestionsQuery.parse(request.query)
        const skip = (page - 1) * limit

        const [suggestions, total] = await Promise.all([
          app.prisma.suggestions.findMany({
            where: { deleted: false },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              cuid: true,
              price: true,

              Need: {
                select: {
                  id: true,
                  title: true,
                  status: true,
                  createdBy: {
                    select: { name: true },
                  },
                },
              },

              createdBy: {
                select: {
                  id: true,
                  name: true,
                  phone: true,
                },
              },

              createdAt: true,
              updatedAt: true,
              status: true,
            },
          }),
          app.prisma.suggestions.count({ where: { deleted: false } }),
        ])

        const normalized = suggestions.map((s) => ({
          ...s,
          price: s.price.toString(),
          need: {
            id: s.Need.id,
            title: s.Need.title,
            status: s.Need.status,
            user: s.Need.createdBy?.name ?? null,
          },
        }))

        return reply.status(200).send({ suggestions: normalized, total, page, limit })
      } catch (error) {
        app.log.error(error)
      }
    },
  })
}
