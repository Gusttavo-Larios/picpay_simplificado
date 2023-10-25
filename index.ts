import Fastify from "fastify";

import { SERVER_PORT } from "./source/config/config.environment_variables";
import CompanyRepository from "./source/database/repositories/repository.company";
import { CompanyType } from "./source/core/entities/entity.company";
import { CreateAccountParams } from "./source/controllers/params/params.company_account";
import { PeopleType } from "./source/core/entities/entity.people";
import PeopleRepository from "./source/database/repositories/repository.people";
import CreatePeopleAccountUseCase from "./source/application/people/use_case_impl.create_account";
import CreateCompanyAccountUseCase from "./source/application/company/use_case_impl.create_account";

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
  const { ownerId, bankId } = request.body as CreateAccountParams;

  const createPeopleAccountUseCase = new CreatePeopleAccountUseCase();

  const account = createPeopleAccountUseCase.createAccount(ownerId, bankId);

  return reply.code(201).send(account);
});

fastify.post("/company", async function name(request, reply) {
  const params = request.body as CompanyType;

  const company = CompanyRepository.create(params);

  return reply.code(201).send(company);
});

fastify.post("/company/account", async (request, reply) => {
  const { ownerId, bankId } = request.body as CreateAccountParams;

  const createCompanyAccountUseCase = new CreateCompanyAccountUseCase();
  const account = createCompanyAccountUseCase.createAccount(ownerId, bankId);

  return reply.code(201).send(account);
});

// Run the server!
try {
  await fastify.listen({ port: Number(SERVER_PORT) });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
