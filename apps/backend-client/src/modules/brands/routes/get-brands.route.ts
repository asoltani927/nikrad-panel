import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const BrandSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
)

const BrandsResponseSchema = z.object({
  brands: z.array(BrandSchema),
})

export const getBrandsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['brands'],
      summary: 'Get all brands',
      response: {
        200: BrandsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const brands = await app.dokamerce.brands.all({
        filter: {
          active: {
            equals: true,
          }
        }
      })

      return reply.status(200).send(BrandsResponseSchema.parse({ brands }))
    },
  })
}
