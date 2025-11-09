import { Messages } from '@/constants/messages'
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
        400: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const data = request.body

      const existing = await app.prisma.category.findUnique({
        where: { slug: data.slug },
      })

      if (existing) {
        return reply.status(400).send({
          message: Messages.category.SLUG_EXISTS,
        })
      }

      const category = await app.prisma.category.create({
        data: {
          ...data,
          createdById: (request.user as any).id,
        },
        select: {
          name: true,
          slug: true,
          names: true,
          parentId: true,
        },
      })

      return reply.status(201).send(CategoryResponseSchema.parse({ category }))
    },
  })
}
