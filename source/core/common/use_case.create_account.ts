import { AccountType } from "../entities/entity.account";
import { BankType } from "../entities/entity.bank";

export interface CreateAccountUseCase {
  createAccount(ownerId: number, bankId: BankType["id"]): AccountType;

  linkOwnerAndAccount(ownerId: number, accountId: AccountType["id"]): void;
}
