import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { authMiddleware } from '@/middlewares'

export const deleteItemFromCartRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: '/:id',
    preHandler: [authMiddleware],
    schema: {
      tags: ['carts'],
      summary: 'Delete a product item from cart by id',
      params: z.object({ id: z.string() }),
      // response: {
      //   200: z.object({ message: z.string() }),
      //   403: z.object({ message: z.string() }),
      //   404: z.object({ message: z.string() }),
      // },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string }
      const result = await app.dokamerce.cart.remove({ id })

      return reply.status(200).send({ message: 'Item deleted successfully' })
    },
  })
}
