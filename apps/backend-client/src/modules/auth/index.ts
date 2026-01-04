import { FastifyInstance } from 'fastify'
import { postAuthSendOtpRoute } from './routes/post-auth-send-otp'
import { postAuthVerifyOtpRoute } from './routes/post-auth-verify-otp'
import { getAuthMeRoute } from './routes/get-authenticated-user'

export async function authModule(app: FastifyInstance) {
  app.register(
    async (app) => {
      app.register(postAuthSendOtpRoute)
      app.register(postAuthVerifyOtpRoute)
      app.register(getAuthMeRoute)
    },
    { prefix: '/auth' },
  )
}
