import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { createInstance } from '@dokamerce/web-sdk'

export async function setup(app: FastifyInstance) {
  const plugin = fp(async (app: FastifyInstance) => {
    const sdk = createInstance({
      realm: process.env.SHOP_REALM!,
      key: process.env.SHOP_API_KEY!,
      onError: (err) => app.log.error(err),
      // mode: 'debug',
    })

    app.decorate('dokamerce', sdk)
  })

  await app.register(plugin)
}
