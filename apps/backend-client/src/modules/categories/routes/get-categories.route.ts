import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const CategoriesSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    cuid: z.string().cuid(),
    name: z.string(),
    slug: z.string(),
    names: z.any(),
    parent: z
      .object({
        cuid: z.string().cuid(),
        name: z.string(),
      })
      .nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    children: z.array(CategoriesSchema).optional(),
  }),
)

const CategoriesResponseSchema = z.object({
  categories: z.array(CategoriesSchema),
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
            select: { cuid: true, name: true },
          },
          children: {
            include: {
              parent: {
                select: { cuid: true, name: true },
              },
            },
          },
        },
      })

      return reply.status(200).send(CategoriesResponseSchema.parse({ categories }))
    },
  })
}
