import { AccountType } from "../entities/entity.account";

export interface CarryOutTransactionUseCase {
  transact(
    originAccountId: AccountType["id"],
    recipientAccountId: AccountType["id"],
    amount: number
  ): Promise<void>;

  obtainAuthorizationForTheTransaction(): Promise<boolean>;

  notifyTheRecipient(): Promise<void>;

  registerTransaction(
    originAccountId: AccountType["id"],
    recipientAccountId: AccountType["id"],
    amount: number
  ): void;
}
