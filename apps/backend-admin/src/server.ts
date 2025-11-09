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

  await fastify.listen({ port: 3000 })
}

start().catch((err) => {
    console.error('❌ Server failed to start')
  console.error('Error name:', err?.name)
  console.error('Error message:', err?.message)
  console.error('Error stack:', err?.stack)
  process.exit(1)
})
