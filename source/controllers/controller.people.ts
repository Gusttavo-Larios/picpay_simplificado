import { FastifyReply, FastifyRequest } from "fastify";

import { PeopleType } from "../core/entities/entity.people";

import CreatePeopleAccountUseCase from "../application/people/use_case_impl.create_account";

import PeopleRepository from "../database/repositories/repository.people";
import { AccountBodyParams } from "./type_params/type_param.account";

export class PeopleController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const params = request.body as PeopleType;

    const people = PeopleRepository.create(params);

    return reply.code(201).send(people);
  }

  static async openAccount(request: FastifyRequest, reply: FastifyReply) {
    const { ownerId, bankId } = request.body as AccountBodyParams["openAccount"];

    const createPeopleAccountUseCase = new CreatePeopleAccountUseCase();

    const account = createPeopleAccountUseCase.createAccount(ownerId, bankId);

    return reply.code(201).send(account);
  }
}
