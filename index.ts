import Fastify from "fastify";

import { SERVER_PORT } from "./source/config/config.environment_variables";
import CompanyRepository from "./source/database/repositories/repository.company";
import { CompanyType } from "./source/core/entities/entity.company";
import AccountRepository from "./source/database/repositories/respository.account";
import { AccountType } from "./source/core/entities/entity.account";
import { CreateAccountParams } from "./source/controllers/params/params.company_account";
import { PeopleType } from "./source/core/entities/entity.people";
import PeopleRepository from "./source/database/repositories/repository.people";
import { AccountTypeEnum } from "./source/enums/enum.account_type";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});


fastify.post("/people", async (request, reply) => {
  const params = request.body as PeopleType;

  const people = PeopleRepository.create(params);

  return reply.code(201).send(people);
});

fastify.post("/people/account", async (request, reply) => {
  const params = request.body as CreateAccountParams;

  const account: AccountType = AccountRepository.create(
    params.ownerId,
    params.bankId,
    AccountTypeEnum.Personal
  );

  return reply.code(201).send(account);
});



fastify.post("/company", async function name(request, reply) {
  const params = request.body as CompanyType;

  const company = CompanyRepository.create(params);

  return reply.code(201).send(company);
});

fastify.post("/company/account", async (request, reply) => {
  const params = request.body as CreateAccountParams;

  const account: AccountType = AccountRepository.create(
    params.ownerId,
    params.bankId,
    AccountTypeEnum.Business
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
