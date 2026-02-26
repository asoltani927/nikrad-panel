import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'
import { Messages } from '@/constants/messages'

export const deleteProductRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['products'],
      summary: 'Delete a product by id',
      params: z.object({ id: z.string() }),
      response: {
        200: z.object({ message: z.string() }),
        403: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    handler: async (request, reply) => {
      // TODO: @reza why? we have authMiddlware
      // const userId = request.user?.id
      // if (!userId) {
      //   return reply.status(403).send({ message: Messages.auth.ACCESS_DENIED })
      // }

      const { id } = request.params as { id: string }

      // @reze I think we can remoe this.
      // @Amin I should think about it
      const product = await app.dokamerce.products.find({ id })
      if (!product) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      await app.dokamerce.products.delete({ id })

      return reply.status(200).send({ message: 'Product deleted successfully' })
    },
  })
}
