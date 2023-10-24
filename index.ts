import Fastify from "fastify";

import { SERVER_PORT } from "./source/config/config.environment_variables";
import CompanyRepository from "./source/database/repositories/repository.company";
import { CompanyType } from "./source/core/entities/entity.company";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

fastify.post("/company", async function name(request, reply) {
  const company = request.body as CompanyType;

  CompanyRepository.create(company);
  return reply.code(201).send(company);
});

// Run the server!
try {
  await fastify.listen({ port: Number(SERVER_PORT) });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
