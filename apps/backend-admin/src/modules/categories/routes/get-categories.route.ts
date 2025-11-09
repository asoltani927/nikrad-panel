import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const CategorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
    slug: z.string(),
    names: z.any(),
    parentId: z.number().nullable(),
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
          children: {
            select: {
              slug: true,
              name: true,
              names: true,
              parentId: true,
            },
          },
        },
      })

      return reply.status(200).send(CategoriesResponseSchema.parse({ categories }))
    },
  })
}
