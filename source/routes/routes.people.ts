import { FastifyInstance } from "fastify";

import { PeopleController } from "../controllers/controller.people";

export async function peopleRoutes(fastify: FastifyInstance) {
  fastify.post("/", PeopleController.create);

  fastify.post("/account", PeopleController.openAccount);

  fastify.post("/transact", PeopleController.carryOutTransaction)
}
