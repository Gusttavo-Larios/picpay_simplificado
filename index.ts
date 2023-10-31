import Fastify from "fastify";

import { SERVER_PORT } from "./source/config/config.environment_variables";

import { peopleRoutes } from "./source/routes/routes.people";
import { companyRoutes } from "./source/routes/routes.company";

const fastify = Fastify({
  logger: true,
});

async function main() {

  fastify.register(peopleRoutes, { prefix: "/people" });
  fastify.register(companyRoutes, { prefix: "/company" });

  // Run the server!
  try {
    await fastify.listen({host: '0.0.0.0', port: Number(3000) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();