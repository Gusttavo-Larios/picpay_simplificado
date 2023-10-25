import { FastifyInstance } from "fastify";

import { CompanyController } from "../controllers/controller.company";

export async function companyRoutes(fastify: FastifyInstance) {
  fastify.post("/", CompanyController.create);

  fastify.post("/account", CompanyController.openAccount);
}
