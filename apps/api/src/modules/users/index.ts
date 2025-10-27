import { FastifyInstance } from 'fastify'
import { getUsers } from './routes/get-users.route'

export async function usersModule(app: FastifyInstance) {
  app.register(getUsers, {
    prefix: '/users',
  })
}
