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
  
  // TODO: adding Cors
  // TODO: adding Rate Limit
  // TODO: adding Security
  // TODO: adding Monitoring
  // TODO: adding Logging
  // TODO: adding Error Handling
  // TODO: adding Performance Monitoring
  // TODO: adding Security
  // TODO: adding Monitoring
  // TODO: adding Logging

  await fastify.listen({ port: 3001 })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
