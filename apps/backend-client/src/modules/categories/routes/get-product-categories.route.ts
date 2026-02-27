import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const ParentCategorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    names: z.any(),
    description: z.string().nullable().optional(),
  }),
)

const ChildCategorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
    names: z.any(),
  }),
)

const CategoriesSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    names: z.any(),
    description: z.string().nullable().optional(),
    parent: ParentCategorySchema.optional().nullable(),
    children: z.array(ChildCategorySchema).optional(),
  }),
)

const CategoriesResponseSchema = z.object({
  categories: z.array(CategoriesSchema),
})

export const getProductCategoriesRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/products',
    schema: {
      tags: ['categories'],
      summary: 'Get all products categories (with children)',
      response: {
        200: CategoriesResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const categories = await app.dokamerce.categories.all({
        filter: {
          active: {
            equals: true,
          }
        },
        withChildren: false,
        withImage: false,
        withParent: true,
      })

      console.log(categories)

      return reply.status(200).send(CategoriesResponseSchema.parse({ categories }))
    },
  })
}
