import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createInstance, DokamerceSDK } from "@dokamerce/web-sdk";

declare module "fastify" {
  interface FastifyInstance {
    dokamerce: DokamerceSDK;
  }
}

export async function setup(app: FastifyInstance) {
  const plugin = fp(async (app: FastifyInstance) => {
    const sdk = createInstance({
      realm: process.env.SHOP_REALM!,
      key: process.env.SHOP_API_KEY!,
      onError: (err) => app.log.error(err),
    });

    app.decorate("dokamerce", sdk);
  });

  await app.register(plugin);
}