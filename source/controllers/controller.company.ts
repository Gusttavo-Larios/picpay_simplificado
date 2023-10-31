import { FastifyReply, FastifyRequest } from "fastify";

import { CompanyType } from "../core/entities/entity.company";

import CreateCompanyAccountUseCase from "../application/company/use_case_impl.create_account";

import CompanyRepository from "../database/repositories/repository.company";

import { AccountBodyParams } from "./type_params/type_param.account";

export class CompanyController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const params = request.body as CompanyType;

    const company = CompanyRepository.create(params);

    return reply.code(201).send(company);
  }

  static async openAccount(request: FastifyRequest, reply: FastifyReply) {
    const { ownerId, bankId } = request.body as AccountBodyParams["openAccount"];;

    const createCompanyAccountUseCase = new CreateCompanyAccountUseCase();
    const account = createCompanyAccountUseCase.createAccount(ownerId, bankId, "BUSINESS");

    return reply.code(201).send(account);
  }
}
