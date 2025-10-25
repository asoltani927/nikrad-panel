import Fastify from 'fastify'
import { initialPlugins } from './plugins'
import { initialModules } from './modules'

async function start() {
  const fastify = Fastify({ logger: true })

  /**
   * Plugin Initialzing
   */
  await initialPlugins(fastify)

  /**
   * Modules Initialzing
   */
  await initialModules(fastify)
  

  await fastify.listen({ port: 3000 })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
