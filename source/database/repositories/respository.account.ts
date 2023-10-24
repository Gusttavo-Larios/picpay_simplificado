import { AccountType } from "../../core/entities/entity.account";
import { BankType } from "../../core/entities/entity.bank";
import { CompanyType } from "../../core/entities/entity.company";
import connection from "../database.connection";

export default class AccountRepository {
  static create(companyId: CompanyType["id"], bankId: BankType["id"]): AccountType {
    const accountShape: AccountType = {
      accountNumber: Date.now(),
      bankId: bankId as number,
    };

    const account = connection
      .prepare(
        `insert into account (account_number, bank_id) values (?,?) RETURNING *`,
        [accountShape.accountNumber, accountShape.bankId]
      )
      .get() as AccountType;

    connection.run(
      `insert into assoc_company_account (company_id, account_id) values (?,?)`,
      [companyId as number, account.id as number]
    );

    return account
  }
}

// AccountRepository.create(1, 1);
