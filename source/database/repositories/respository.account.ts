import { AccountType } from "../../core/entities/entity.account";
import { BankType } from "../../core/entities/entity.bank";
import { AccountTypeEnum } from "../../enums/enum.account_type";
import connection from "../database.connection";

export default class AccountRepository {
  private static associtationOwnerAndAccountTables = {
    PERSONAL: {
      table: "assoc_people_account",
      primaryKey: "people_id",
    },
    BUSINESS: {
      table: "assoc_company_account",
      primaryKey: "company_id",
    },
  };

  static create(
    ownerId: number,
    bankId: BankType["id"],
    type: AccountTypeEnum
  ): AccountType {
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

    const { table, primaryKey } =
      AccountRepository.associtationOwnerAndAccountTables[type];

    connection.run(
      `insert into ${table} (${primaryKey}, account_id) values (?,?)`,
      [ownerId as number, account.id as number]
    );

    return account;
  }
}
