import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const CategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  names: z.object({
    fa: z.string(),
    en: z.string(),
  }),
  parentId: z.number().nullable().optional(),
})

const CategoryResponseSchema = z.object({
  category: CategorySchema,
})

export const postCategoryRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['categories'],
      summary: 'Create new category',
      body: CategorySchema,
      response: {
        201: CategoryResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const data = request.body

      const category = await app.prisma.category.create({
        data,
        select: {
          name: true,
          slug: true,
          names: true,
          parentId: true,
        },
      })

      return reply.status(201).send(categoryResponseSchema.parse({ category }))
    },
  })
}
