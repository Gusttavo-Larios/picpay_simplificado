import Fastify from "fastify";

import { SERVER_PORT } from "./source/config/config.environment_variables";
import CompanyRepository from "./source/database/repositories/repository.company";
import { CompanyType } from "./source/core/entities/entity.company";
import AccountRepository from "./source/database/repositories/respository.account";
import { AccountType } from "./source/core/entities/entity.account";
import { CreateAccountParams } from "./source/controllers/params/params.company_account";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

fastify.post("/company", async function name(request, reply) {
  const params = request.body as CompanyType;

  const company = CompanyRepository.create(params);

  return reply.code(201).send(company);
});

fastify.post("/company/account", async (request, reply) => {
  const params = request.body as CreateAccountParams;

  const account: AccountType = AccountRepository.create(
    params.companyId,
    params.bankId
  );

  return reply.code(201).send(account);
});

// Run the server!
try {
  await fastify.listen({ port: Number(SERVER_PORT) });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
