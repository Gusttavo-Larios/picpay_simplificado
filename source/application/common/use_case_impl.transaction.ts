import {
  PAYMENT_AUTHORIZATION_SERVICE_URL,
  TRANSACTION_NOTIFICATION_SERVICE_URL,
} from "../../config/config.environment_variables";

import { CarryOutTransactionUseCase } from "../../core/common/use_case.transaction";

import AccountRepository from "../../database/repositories/repository.account";
import TransactionCarriedOutRepository from "../../database/repositories/repository.transaction_carried_out";

export class CarryOutTransactionUseCaseImpl
  implements CarryOutTransactionUseCase
{
  private accountRepository = new AccountRepository();
  private transactionCarriedOutRepository =
    new TransactionCarriedOutRepository();

  async transact(
    originAccountId: number,
    recipientAccountId: number,
    amount: number
  ): Promise<void> {
    const originAccount = this.accountRepository.findById(originAccountId);

    if (originAccount === null)
      throw new Error("Conta de origem não encontrada.");

    if (originAccount.account_type?.type === "BUSINESS")
      throw new Error("A conta de origem não pode ser do tipo empresárial.");

    const recipientAccount =
      this.accountRepository.findById(recipientAccountId);

    if (recipientAccount === null)
      throw new Error("Conta de destino não encontrada.");

    const existsAvaliableLimit = originAccount.amount >= amount;

    if (!existsAvaliableLimit) {
      throw new Error("Limite insuficiente para realizar essa transação.");
    }

    const authorization = await this.obtainAuthorizationForTheTransaction();

    if (!authorization) {
      throw new Error("A transação não foi autorizada.");
    }

    try {
      const originAccountNewAmount = originAccount?.amount - amount;
      this.accountRepository.update(originAccountId, {
        amount: originAccountNewAmount,
      });

      const recipientAccountNewAmount = recipientAccount?.amount + amount;
      this.accountRepository.update(recipientAccountId, {
        amount: recipientAccountNewAmount,
      });

      this.registerTransaction(originAccountId, recipientAccountId, amount);

      this.notifyTheRecipient();
    } catch (error) {
      this.accountRepository.update(originAccountId, {
        ...originAccount,
        amount: originAccount.amount,
      });

      this.accountRepository.update(recipientAccountId, {
        ...recipientAccount,
        amount: recipientAccount.amount,
      });

      throw new Error("A transação falhou.");
    }
  }

  async obtainAuthorizationForTheTransaction(): Promise<boolean> {
    const response = await fetch(PAYMENT_AUTHORIZATION_SERVICE_URL);

    const item = (await response.json()) as { message: string };

    return item?.message === "Autorizado";
  }

  async notifyTheRecipient(): Promise<void> {
    await fetch(TRANSACTION_NOTIFICATION_SERVICE_URL);
  }

  registerTransaction(
    originAccountId: number,
    recipientAccountId: number,
    amount: number
  ): void {
    this.transactionCarriedOutRepository.create({
      originAccountId,
      targetAccountId: recipientAccountId,
      amount,
    });
  }
}
