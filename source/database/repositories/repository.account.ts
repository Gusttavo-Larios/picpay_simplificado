import { AccountType } from "../../core/entities/entity.account";
import { AccountTypeType } from "../../core/entities/entity.account_type";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import connection from "../database.connection";

export default class AccountRepository
  implements RepositoryInterface<AccountType>
{
  create({
    bankId,
    accountNumber,
    amount,
    accountTypeId,
  }: Omit<AccountType, "id">): AccountType {
    const account = connection
      .prepare(
        `insert into account (account_number, bank_id, amount, account_type_id) values (?,?,?,?) RETURNING *`,
        [accountNumber, bankId, amount, accountTypeId]
      )
      .get() as AccountType;

    return account;
  }

  findById(id: AccountType["id"]): AccountType<AccountTypeType> | null {
    const queryResult: any = connection
      .prepare(
        `select * from account join account_type on account_type.id = account.account_type_id where account.id = ?`,
        [id]
      )
      .get();

    return {
      id: queryResult.id,
      accountNumber: queryResult.account_number,
      amount: queryResult.amount,
      bankId: queryResult.bank_id,
      accountTypeId: queryResult.account_type_id,
      accountType: {
        id: queryResult.account_type_id,
        type: queryResult.type,
      },
    };
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

const account = new AccountRepository();

const x = account.findById(1);

console.log(x);
