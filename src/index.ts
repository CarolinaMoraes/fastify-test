import { MikroORM, RequestContext } from "@mikro-orm/core";
import { fastify } from "fastify";
import fastifyAuth0 from "fastify-auth0-verify";
import registerRoutesPlugin from "./commons/plugins/registerRoutes.plugin";
import mikroOrmConfig from "./config/mikro-orm.config";

async function bootstrap(port = Number(process.env.API_PORT) || 3000) {
  const app = fastify({
    logger: true,
    ajv: { customOptions: { coerceTypes: false } },
  });

  let orm;

  try {
    orm = await MikroORM.init(mikroOrmConfig);
  } catch (error) {
    app.log.error(error);
    return;
  }

  // register request context hook
  app.addHook("onRequest", (request, reply, done) => {
    RequestContext.create(orm.em, done);
  });

  app.addHook("preValidation", async (request, reply) => {
    try {
      await app.authenticate(request, reply);
    } catch (error) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });

  // shut down the connection when closing the app
  app.addHook("onClose", async () => {
    await orm.close();
  });

  app.register(fastifyAuth0, {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
  });

  app.register(registerRoutesPlugin)

  app.setErrorHandler((error, request, reply) => {
    app.log.error(`An error ocurred: ${error.message}`)
    app.log.error(error.stack)
    reply.status(error.statusCode || 500).send({ message: error.message })
  })

  try {
    const url = await app.listen({ port, host: "0.0.0.0" });
    app.log.info("Server initialized successfully");
  } catch (error) {
    app.log.error("Server was not able to run");
    app.log.error(error);
  }
}

bootstrap();
