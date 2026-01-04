import { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt'

export async function setup(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    sign: {
      expiresIn: '7d',
    },
  })
}
