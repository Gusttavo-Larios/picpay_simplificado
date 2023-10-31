import { FastifyReply, FastifyRequest } from "fastify";

import { PeopleType } from "../core/entities/entity.people";

import CreatePeopleAccountUseCase from "../application/people/use_case_impl.create_account";

import PeopleRepository from "../database/repositories/repository.people";
import { AccountBodyParams } from "./type_params/type_param.account";
import { CarryOutTransactionUseCaseImpl } from "../application/common/use_case_impl.transaction";

export class PeopleController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const params = request.body as PeopleType;

    const people = PeopleRepository.create(params);

    return reply.code(201).send(people);
  }

  static async openAccount(request: FastifyRequest, reply: FastifyReply) {
    const { ownerId, bank_id } =
      request.body as AccountBodyParams["openAccount"];

    const createPeopleAccountUseCase = new CreatePeopleAccountUseCase();

    const account = createPeopleAccountUseCase.createAccount(ownerId, bank_id, "PERSONAL");

    return reply.code(201).send(account);
  }

  static async carryOutTransaction(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { originAccountId, recipientAccountId, amount } = request.body as {
        originAccountId: number;
        recipientAccountId: number;
        amount: number;
      };

      const carryOutTransaction = new CarryOutTransactionUseCaseImpl();

      await carryOutTransaction.transact(
        originAccountId,
        recipientAccountId,
        amount
      );

      return reply.status(200).send({
        message: "Transação finalizada com sucesso.",
      });
    } catch (error: any) {
      reply.status(400).send({
        error: error?.message,
      });
    }
  }
}
