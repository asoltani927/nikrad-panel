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

export const getCategoryBySlugRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:slug',
    schema: {
      tags: ['categories'],
      summary: 'Get category by slug',
      params: z.object({
        slug: z.string().min(1),
      }),
      response: {
        200: CategorySchema,
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      const { slug } = request.params

      const category = await app.prisma.category.findUnique({
        where: { slug },
        include: {
          children: {
            select: {
              id: true,
              slug: true,
              name: true,
              names: true,
              parentId: true,
            },
          },
        },
      })

      if (!category) {
        return reply.status(404).send({ message: 'دسته بندی یافت نشد' })
      }

      return reply.status(200).send(category)
    },
  })
}
