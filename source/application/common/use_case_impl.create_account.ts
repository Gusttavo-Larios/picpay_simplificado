import { AccountType } from "../../core/entities/entity.account";
import { CreateAccountUseCase } from "../../core/common/use_case.create_account";

import AccountRepository from "../../database/repositories/repository.account";
import { AccountTypeType } from "../../core/entities/entity.account_type";

export abstract class CreateAccountUseCaseImpl implements CreateAccountUseCase {
  private accountRepository = new AccountRepository();

  createAccount(
    ownerId: number,
    bankId: number,
    accountType: AccountTypeType["type"]
  ): AccountType {
    const accountNumber = Date.now();

    const account = this.accountRepository?.create({
      bankId,
      accountNumber,
      amount: 0,
      accountTypeId: accountType === "BUSINESS" ? 2 : 1,
    });

    this.linkOwnerAndAccount(ownerId, account.id);

    return account;
  }

  abstract linkOwnerAndAccount(ownerId: number, accountId: number): void;
}
