import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

const CreateSuggestionSchema = z.object({
  needId: z.number(),
  price: z.string(),
})

const SuggestionResponseSchema = z.object({
  cuid: z.string().optional(),
  price: z.string(),
  need: z.object({
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

export const postSuggestionRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['suggestions'],
      summary: 'Create new suggestion',
      body: CreateSuggestionSchema,
      response: {
        201: SuggestionResponseSchema,
        404: z.object({ message: z.string() }),
        400: z.object({ message: z.string() }),
        403: z.object({ message: z.string() }),
      },
    },

    handler: async (request, reply) => {
      const { needId, price } = request.body as z.infer<typeof CreateSuggestionSchema>

      if (!request.user) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }
      const userId = (request.user as { id: number }).id

      const need = await app.prisma.need.findUnique({
        where: { id: needId },
        select: {
          id: true,
          title: true,
          status: true,
          createdBy: { select: { name: true } },
        },
      })

      if (!need) {
        return reply.status(404).send({ message: Messages.needs.NOT_FOUND })
      }

      const existing = await app.prisma.suggestions.findFirst({
        where: {
          NeedId: needId,
          createdById: userId,
          deleted: false,
        },
      })

      if (existing) {
        return reply.status(400).send({ message: Messages.suggestions.ALREADY_EXISTS })
      }

      let priceBigInt: bigint
      try {
        const numeric = String(price).replace(/[,\s]/g, '')
        priceBigInt = BigInt(numeric)
      } catch (err) {
        return reply.status(400).send({ message: 'Invalid price value' })
      }

      const created = await app.prisma.suggestions.create({
        data: {
          NeedId: needId,
          createdById: userId,
          price: priceBigInt,
        },
        select: {
          id: true,
          cuid: true,
          price: true,
          Need: {
            select: {
              title: true,
              status: true,
              createdBy: { select: { name: true } },
            },
          },
          createdBy: { select: { name: true, phone: true } },
          createdAt: true,
          updatedAt: true,
          status: true,
        },
      })

      const normalized = {
        cuid: created.cuid,
        id: created.id,
        price: created.price.toString(),
        need: {
          title: created.Need.title,
          status: created.Need.status,
          user: created.Need.createdBy?.name ?? null,
        },
        createdBy: created.createdBy,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
        status: created.status,
      }

      return reply.status(201).send(SuggestionResponseSchema.parse(normalized))
    },
  })
}
