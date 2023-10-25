import { AccountType } from "../../core/entities/entity.account";
import { CreateAccountUseCase } from "../../core/common/use_case.create_account";

import AccountRepository from "../../database/repositories/respository.account";

export abstract class CreateAccountUseCaseImpl implements CreateAccountUseCase {

  private accountRepository = new AccountRepository();

  createAccount(ownerId: number, bankId: number): AccountType {
    const accountNumber = Date.now();

    const account = this.accountRepository?.create({ bankId, accountNumber });

    this.linkOwnerAndAccount(ownerId, account.id);

    return account;
  }

  abstract linkOwnerAndAccount(ownerId: number, accountId: number): void;
}
