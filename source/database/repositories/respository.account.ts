import { AccountType } from "../../core/entities/entity.account";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import connection from "../database.connection";

export default class AccountRepository
  implements RepositoryInterface<AccountType>
{
  create({
    bankId,
    accountNumber,
    amount,
  }: Omit<AccountType, "id">): AccountType {
    const account = connection
      .prepare(
        `insert into account (account_number, bank_id, amount) values (?,?, ?) RETURNING *`,
        [accountNumber, bankId, amount]
      )
      .get() as AccountType;

    return account;
  }

  findById(id: AccountType["id"]): AccountType | null {
    return connection
      .prepare(`select * from account where id = ?`, [id])
      .get() as AccountType;
  }

  update(
    id: AccountType["id"],
    item: Omit<AccountType, "id" | "accountNumber" | "bankId">
  ): AccountType {
    const keys = Object.keys(item);

    const columns = keys.map((item) => `${item} = ?`);
    const newValues = Object.values(item);

    return connection
      .prepare(`update account set ${columns} where id = ?`, [...newValues, id])
      .get() as AccountType;
  }
}
