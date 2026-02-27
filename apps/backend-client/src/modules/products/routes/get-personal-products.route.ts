import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { ProductSchema } from '../schema/get-products.schema'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'
import { ForbiddenResponseSchema } from '@/schema/forbidden-response.schema'
import { BadRequestResponseSchema } from '@/schema/bad-request-response.schema'


export const GetProductResponseSchema = z.object({
  products: z.array(ProductSchema),
})

export const getPersonalProducsRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/personal',
    preHandler: [authMiddleware],
    schema: {
      tags: ['products'],
      summary: 'Get products owned by the user id',
      response: {
        200: GetProductResponseSchema,
        404: BadRequestResponseSchema,
        403: ForbiddenResponseSchema
      },
    },

    handler: async (request, reply) => {
      const id = request.authenticatedUser?.customer?.id;
      if (!id) {
        return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      }
      const response = await app.dokamerce.products.paginated({
        filter: {
          customer: {
            id: {
              equals: id
            }
          }
        }
      })
      return reply
        .status(200)
        .send(GetProductResponseSchema.parse({ products: response?.edges?.map(edge => ProductSchema.parse(edge.node)) ?? [] }))
    },
  })
}
