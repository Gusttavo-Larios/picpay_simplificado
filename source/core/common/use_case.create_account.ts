import { AccountType } from "../entities/entity.account";
import { AccountTypeType } from "../entities/entity.account_type";
import { BankType } from "../entities/entity.bank";

export interface CreateAccountUseCase {
  createAccount(ownerId: number, bank_id: BankType["id"], account_type: AccountTypeType["type"]): AccountType;

  linkOwnerAndAccount(ownerId: number, accountId: AccountType["id"]): void;
}
