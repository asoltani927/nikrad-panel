import { FastifyInstance } from 'fastify'
import fastifyRedis from '@fastify/redis'

export async function setup(app: FastifyInstance) {
  app.register(fastifyRedis, {
    url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
    
  })
}
