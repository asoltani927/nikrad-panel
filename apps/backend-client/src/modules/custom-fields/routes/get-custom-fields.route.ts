import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { CustomFieldTarget, Prisma } from '@nikrad/database'
import { authMiddleware } from '@/middlewares'

const customFieldsSchema = z.object({
  id: z.number(),
  cuid: z.string(),
  name: z.string(),
  title: z.string(),
  type: z.string(),
  required: z.boolean(),
  order: z.number().nullable(),
  step: z.number().nullable(),
  categoryId: z.number().nullable(),
  target: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const CustomFieldsResponseSchema = z.object({
  data: z.array(customFieldsSchema),
})

// target is required
const QuerySchema = z.object({
  search: z.string().optional(),
  target: z.nativeEnum(CustomFieldTarget), // required and type-safe
})

export const getCustomFieldsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    preHandler: authMiddleware,
    schema: {
      tags: ['customFields'],
      summary: 'Get all custom fields filtered by target (no pagination)',
      querystring: QuerySchema,
      response: {
        200: CustomFieldsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { search, target } = request.query

      const where: Prisma.CustomFieldWhereInput = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }),
        target, // required
        deleted: false, // exclude soft-deleted
      }

      const customFields = await app.prisma.customField.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          cuid: true,
          name: true,
          title: true,
          type: true,
          required: true,
          order: true,
          step: true,
          categoryId: true,
          target: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      return reply.status(200).send(CustomFieldsResponseSchema.parse({ data: customFields }))
    },
  })
}
