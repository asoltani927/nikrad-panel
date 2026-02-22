import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { createPayamTakProvider } from '@/provider/payamtak'

export interface TextingProvider {
  sendText: (to: string, message: string) => Promise<void>
}

export interface TextingPluginOptions {
  provider: TextingProvider
}

declare module 'fastify' {
  interface FastifyInstance {
    texting: TextingProvider
  }
}
export interface TextingProvider {
  sendText: (to: string, message: string) => Promise<void>;
  sendPattern: (to: string, patternId: string, values: Record<string, string>) => Promise<void>;
  sendOtp: (to: string, code: string) => Promise<void>;
}

export async function setup(app: FastifyInstance) {
  const textingPlugin = fp(async (app: FastifyInstance, opts: TextingPluginOptions) => {
    if (!opts.provider) {
      throw new Error('Texting plugin requires a provider')
    }

    app.decorate('texting', opts.provider)

    app.log.info('Texting plugin initialized')
  })

  await app.register(textingPlugin, {
    provider: createPayamTakProvider()
  })
}
