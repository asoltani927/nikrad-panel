import { FastifyInstance } from 'fastify'
import { postNewsletterRoute } from './routes/post-newsletter.route'

export async function newsletterModule(app: FastifyInstance) {
  app.register(
    async (newsletterApp) => {
      newsletterApp.register(postNewsletterRoute)
    },
    { prefix: '/newsletter' },
  )
}
