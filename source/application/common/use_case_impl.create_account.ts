import { AccountType } from "../../core/entities/entity.account";
import { CreateAccountUseCase } from "../../core/common/use_case.create_account";

import AccountRepository from "../../database/repositories/repository.account";
import { AccountTypeType } from "../../core/entities/entity.account_type";

export abstract class CreateAccountUseCaseImpl implements CreateAccountUseCase {
  private accountRepository = new AccountRepository();

  createAccount(
    ownerId: number,
    bank_id: number,
    account_type: AccountTypeType["type"]
  ): AccountType {
    const account_number = Date.now();

    const account = this.accountRepository?.create({
      bank_id,
      account_number,
      amount: 10000,
      account_type_id: account_type === "BUSINESS" ? 2 : 1,
    });

    this.linkOwnerAndAccount(ownerId, account.id);

    return account;
  }

  abstract linkOwnerAndAccount(ownerId: number, accountId: number): void;
}
