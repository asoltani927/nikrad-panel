import { FastifyInstance } from 'fastify'
import { getUsers } from './routes/get-users.route'
import { authMiddleware } from '@/middlewares'

export async function usersModule(app: FastifyInstance) {
  app.register(getUsers, {
    prefix: '/users',
    preHandler: authMiddleware,
  })
}
