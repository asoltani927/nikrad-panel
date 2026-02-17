import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

const SubscribeNewsletterSchema = z.object({
  email: z.string().email(),
})

const NewsletterResponseSchema = z.object({
  subscriber: z.object({
    email: z.string(),
    createdAt: z.date(),
  }),
})

export const postNewsletterRoute = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['newsletter'],
      summary: 'Subscribe to newsletter',
      body: SubscribeNewsletterSchema,
      response: {
        201: NewsletterResponseSchema,
        409: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { email } = request.body

      const existing = await app.prisma.newsletterSubscriber.findUnique({
        where: { email },
      })

      if (existing) {
        return reply.status(409).send({
          message: 'Email already subscribed',
        })
      }

      const subscriber = await app.prisma.newsletterSubscriber.create({
        data: {
          email: email.toLowerCase(),
        },
        select: {
          email: true,
          createdAt: true,
        },
      })

      return reply
        .status(201)
        .send(NewsletterResponseSchema.parse({ subscriber }))
    },
  })
}