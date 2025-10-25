import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import fp from "fastify-plugin";
import pino, { Logger as PinoLogger, LoggerOptions } from "pino";
import { randomUUID } from "crypto";

type LogMeta = Record<string, any>;

export class Logger {
  private logger: PinoLogger;

  constructor(options?: LoggerOptions) {
    const isDev = process.env.NODE_ENV !== "production";

    this.logger = pino({
      level: process.env.LOG_LEVEL || "info",
      timestamp: pino.stdTimeFunctions.isoTime,
      transport: isDev
        ? { target: "pino-pretty", options: { colorize: true, translateTime: true } }
        : undefined,
      ...options,
    });
  }

  info(message: string, meta?: LogMeta) {
    this.logger.info(meta || {}, message);
  }

  warn(message: string, meta?: LogMeta) {
    this.logger.warn(meta || {}, message);
  }

  error(message: string, meta?: LogMeta) {
    this.logger.error(meta || {}, message);
  }

  debug(message: string, meta?: LogMeta) {
    this.logger.debug(meta || {}, message);
  }

  get instance() {
    return this.logger;
  }

  interceptConsole() {
    console.log = (...args: any[]) => this.info("console.log", { args });
    console.info = (...args: any[]) => this.info("console.info", { args });
    console.warn = (...args: any[]) => this.warn("console.warn", { args });
    console.error = (...args: any[]) => this.error("console.error", { args });
    console.debug = (...args: any[]) => this.debug("console.debug", { args });
  }
}

// Fastify plugin setup
export async function setup(app: FastifyInstance) {
  const plugin = fp(async (app: FastifyInstance) => {
    const logger = new Logger();
    app.decorate("logger", logger);
    app.log = logger.instance;

    // Intercept all console logs
    logger.interceptConsole();

    // Assign unique request ID and log incoming requests
    app.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
      (request as any).id = randomUUID();
      logger.info(`Incoming request: ${request.method} ${request.url}`, {
        requestId: (request as any).id,
      });
    });

    // Log response
    app.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
      const reqId = (request as any).id;
      logger.info(`Request completed: ${request.method} ${request.url} ${reply.statusCode}`, {
        requestId: reqId,
        statusCode: reply.statusCode,
      });
    });

    // Global error logging
    app.addHook("onError", async (request: FastifyRequest, reply: FastifyReply, error: Error) => {
      const reqId = (request as any).id;
      logger.error(`Error in request: ${request.method} ${request.url} - ${error.message}`, {
        requestId: reqId,
        stack: error.stack,
      });
    });
  });

  await app.register(plugin);
}
