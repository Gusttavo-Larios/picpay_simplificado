import { AccountType } from "../../core/entities/entity.account";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import connection from "../database.connection";

export default class AccountRepository
  implements RepositoryInterface<AccountType>
{
  create({ bankId, accountNumber }: Omit<AccountType, "id">): AccountType {
    const account = connection
      .prepare(
        `insert into account (account_number, bank_id) values (?,?) RETURNING *`,
        [accountNumber, bankId]
      )
      .get() as AccountType;

    return account;
  }
}
