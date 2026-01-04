import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export interface RateLimitOptions {
  redis: any // ioredis instance
  limit: number // تعداد مجاز درخواست
  window: number // بازه زمانی (ثانیه)
  keyGenerator?: (req: FastifyRequest) => string
}

const rateLimitPlugin = fp(async (app: FastifyInstance, opts: RateLimitOptions) => {
  const { redis, limit, window, keyGenerator } = opts

  if (!redis) throw new Error('RateLimit plugin requires Redis instance')

  app.decorate('rateLimit', async (req: FastifyRequest, reply: FastifyReply) => {
    const key = keyGenerator?.(req) || `ratelimit:${req.ip}:${req.url}`

    const ttl = window
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, ttl)
    }

    if (current > limit) {
      reply.code(429).send({
        success: false,
        message: 'Too many requests, please try later.',
      })
      return false
    }

    return true
  })
})

export async function setup(app: FastifyInstance, redis: any) {
  await app.register(rateLimitPlugin, {
    redis,
    limit: 3, // مثلا ۳ درخواست
    window: 60, // در ۶۰ ثانیه
    keyGenerator: (req) => `ratelimit:${req.ip}:${req.url}`, // یا req.routeOptions.url
  })
}
