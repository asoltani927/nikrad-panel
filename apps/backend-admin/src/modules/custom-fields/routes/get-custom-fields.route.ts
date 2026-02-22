import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { Prisma, CustomFieldTarget } from '@nikrad/database'
import { createPaginationMeta } from '@/utils/pagination' // ✅ import helper
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
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    links: z
      .object({
        first: z.string().optional(),
        last: z.string().optional(),
        prev: z.string().optional(),
        next: z.string().optional(),
      })
      .optional(),
  }),
  data: z.array(customFieldsSchema),
})

const QuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  target: z.string().optional(),
})

export const getCustomFieldsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    preHandler: authMiddleware,
    schema: {
      tags: ['customFields'],
      summary: 'Get all custom fields with pagination and optional target filter',
      querystring: QuerySchema,
      response: {
        200: CustomFieldsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { page, limit, search, target } = request.query

      const where: Prisma.CustomFieldWhereInput = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }),
        ...(target && { target: target as CustomFieldTarget }),
        deleted: false,
      }

      const [total, customFields] = await app.prisma.$transaction([
        app.prisma.customField.count({ where }),
        app.prisma.customField.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
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
        }),
      ])

      const meta = createPaginationMeta(total, page, limit, request)

      return reply.status(200).send(
        CustomFieldsResponseSchema.parse({
          meta,
          data: customFields,
        })
      )
    },
  })
}
