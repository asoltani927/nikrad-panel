import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authMiddleware } from '@/middlewares'
import {
  CreateProductBodySchema,
  CreateProductResponseSchema,
} from '../schema/create-product.schema'

export const postProductRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    preHandler: [authMiddleware],
    schema: {
      tags: ['products'],
      summary: 'Create new product',
      body: CreateProductBodySchema,
      response: {
        201: CreateProductResponseSchema,
        403: CreateProductResponseSchema.pick({ message: true }),
      },
    },

    handler: async (request, reply) => {
      // @reza
      // if (!request.user?.id) {
      //   return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      // }

      const body = request.body

      // TODO: Remove this when dokamerce is ready
      const createdProduct = await app.dokamerce.products.create({
        data: {
          ...body,
          condition: "NEW" as unknown as any,
          businessRules: {} as any,
          status: "PHYSICAL" as unknown as any,
          type: "PHYSICAL" as unknown as any,
        },
      })

      return reply.status(201).send(
        CreateProductResponseSchema.parse({
          ...createdProduct,
          message: 'Product created successfully',
        }),
      )
    },
  })
}
