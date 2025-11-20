import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { Messages } from '@/constants/messages'

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

export const getSuggestionRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:id',
    schema: {
      tags: ['suggestions'],
      summary: 'Get a suggestion by ID',
      params: z.object({
        id: z.coerce.number(),
      }),
      response: {
        200: SuggestionResponseSchema,
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params

      const suggestion = await app.prisma.suggestions.findUnique({
        where: { id },
        select: {
          id: true,
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
            select: { id: true, name: true, phone: true },
          },
          createdAt: true,
          updatedAt: true,
          status: true,
        },
      })

      if (!suggestion) {
        return reply.status(404).send({ message: Messages.suggestions.NOT_FOUND })
      }

      // normalize
      const normalized = {
        ...suggestion,
        price: suggestion.price.toString(),
        need: {
          id: suggestion.Need.id,
          title: suggestion.Need.title,
          status: suggestion.Need.status,
          user: suggestion.Need.createdBy?.name ?? null,
        },
      }

      return reply.status(200).send(normalized)
    },
  })
}
