import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

const ProvinceSchema = z.object({
  code: z.string(),
  name: z.string(),
  countryCode: z.string(),
})

const ProvinceResponseSchema = z.object({
  provinces: z.array(ProvinceSchema),
})

export const getProvincesRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['provinces'],
      summary: 'Get all provinces',
      response: {
        200: ProvinceResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const provinces = await app.prisma.region.findMany({
        select: { code: true, name: true, countryCode: true },
      })

      return reply.status(200).send(
        ProvinceResponseSchema.parse({ provinces }), 
      )
    },
  })
}
