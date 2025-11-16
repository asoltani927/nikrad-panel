import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const CategorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    names: z.any(),
    parent: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    children: z.array(CategorySchema).optional(),
  }),
)

const CategoriesResponseSchema = z.object({
  categories: z.array(CategorySchema),
})

export const getCategoriesRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['categories'],
      summary: 'Get all categories (with children)',
      response: {
        200: CategoriesResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const categories = await app.prisma.category.findMany({
        where: { parentId: null },
        include: {
          parent: {
            select: { id: true, name: true },
          },
          children: {
            include: {
              parent: {
                select: { id: true, name: true },
              },
            },
          },
        },
      })

      return reply.status(200).send(CategoriesResponseSchema.parse({ categories }))
    },
  })
}
