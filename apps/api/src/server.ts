import Fastify from 'fastify'
import { initialPlugins } from './plugins'
import { initialModules } from './modules'

async function start() {
  const fastify = Fastify({ logger: true })

  /**
   * Plugin Initializing
   */
  await initialPlugins(fastify)

  /**
   * Modules Initializing
   */
  await initialModules(fastify)
  

  await fastify.listen({ port: 3000 })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
