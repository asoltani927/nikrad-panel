import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createInstance } from "@shop/web-sdk";

export async function setup(app: FastifyInstance) {
  const sdkPlugin = fp(async (app: FastifyInstance) => {
    const sdk = createInstance({
      realm: process.env.SHOP_REALM!,
      key: process.env.SHOP_API_KEY!,
      onError: (err) => {
        app.log.error(err);
      },
    });

    app.decorate("shopSdk", sdk);
  });

  await app.register(sdkPlugin);
}
