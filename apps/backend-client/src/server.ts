import Fastify from 'fastify'
import 'dotenv/config'
import { initialPlugins } from './plugins'
import { initialModules } from './modules'
import cors from '@fastify/cors'

async function start() {
  const fastify = Fastify({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    },
  })

  fastify.log.info('🚀 Fastify initializing...')
  fastify.log.info(`🟦 Node.js Version: ${process.version}`)
  fastify.log.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)

  console.time('⏱ Startup time')

  // -------------------------
  // CORS
  // -------------------------
  fastify.log.info('🔒 Registering CORS...')
  await fastify.register(cors, {
    origin: ['http://localhost:3002'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
  fastify.log.info('✔ CORS registered')

  // -------------------------
  // Plugins
  // -------------------------
  fastify.log.info('🔌 Loading plugins...')
  await initialPlugins(fastify)
  fastify.log.info('✔ Plugins loaded')

  // -------------------------
  // Modules (Routes)
  // -------------------------
  fastify.log.info('📦 Loading modules...')
  await initialModules(fastify)
  fastify.log.info('✔ Modules loaded')

  // -------------------------
  // Start Server
  // -------------------------
  try {
    await fastify.listen({ port: 8000, host: '0.0.0.0' })
    fastify.log.info('🔥 Server running at http://localhost:8000')
  } catch (err) {
    fastify.log.error('❌ Failed to start server')
    fastify.log.error(err)
    process.exit(1)
  }

  console.timeEnd('⏱ Startup time')
}

start().catch((err) => {
  console.error('❌ Server crashed before initialization')
  console.error('Error name:', err.name)
  console.error('Error message:', err.message)
  console.error('Error stack:', err.stack)
  process.exit(1)
})
