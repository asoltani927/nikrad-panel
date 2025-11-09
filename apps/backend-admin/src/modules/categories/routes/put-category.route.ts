import { Messages } from '@/constants/messages'
import { authMiddleware } from '@/middlewares'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export const UpdateCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  names: z.object({
    fa: z.string(),
    en: z.string(),
  }),
  parentId: z.number().nullable().optional(),
})

const UpdateCategoryResponseSchema = z.object({
  category: UpdateCategorySchema,
})

export const putCategoryRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'PUT',
    url: '/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['categories'],
      summary: 'Update a category by ID',
      params: z.object({
        id: z.coerce.number(),
      }),
      body: UpdateCategorySchema,
      response: {
        200: UpdateCategoryResponseSchema,
        404: z.object({ message: z.string() }),
        400: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params
      const data = request.body

      const existing = await app.prisma.category.findUnique({
        where: { id },
      })
      if (!existing) {
        return reply.status(404).send({ message: Messages.category.NOT_FOUND })
      }

      const slugExists = await app.prisma.category.findFirst({
        where: { slug: data.slug, NOT: { id } },
      })
      if (slugExists) {
        return reply.status(400).send({ message: Messages.category.SLUG_EXISTS })
      }

      const category = await app.prisma.category.update({
        where: { id },
        data,
        select: {
          name: true,
          slug: true,
          names: true,
          parentId: true,
        },
      })

      return reply.status(200).send(UpdateCategoryResponseSchema.parse({ category }))
    },
  })
}
