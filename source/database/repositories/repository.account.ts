import { AccountType } from "../../core/entities/entity.account";
import { AccountTypeType } from "../../core/entities/entity.account_type";
import { RepositoryInterface } from "../../interfaces/interface.repository";
import connection from "../database.connection";

export default class AccountRepository
  implements RepositoryInterface<AccountType>
{
  create({
    bank_id,
    account_number,
    amount,
    account_type_id,
  }: Omit<AccountType, "id">): AccountType {
    const account = connection
      .prepare(
        `insert into account (account_number, bank_id, amount, account_type_id) values (?,?,?,?) RETURNING *`,
        [account_number, bank_id, amount, account_type_id]
      )
      .get() as AccountType;

    return account;
  }

  findById(id: AccountType["id"]): AccountType<AccountTypeType> | null {
    const queryResult: AccountType & AccountTypeType| null = connection
      .prepare(
        `select 
        account.*,
        (select type from account_type where id = account.account_type_id) as type 
        from account 
        where account.id = ?`,
        [id]
        )
        .get();
        // inner join account_type on account_type.id = account.account_type_id 

      if(queryResult === null) {
        return null
      }

    return {
      id: queryResult.id,
      account_number: queryResult.account_number,
      amount: queryResult.amount,
      bank_id: queryResult.bank_id,
      account_type_id: queryResult.account_type_id,
      account_type: {
        id: queryResult.account_type_id,
        type: queryResult.type,
      },
    };
  }

  update(
    id: AccountType["id"],
    item: {
      account_number?: AccountType["account_number"];
      amount?: AccountType["amount"];
      bank_id?: AccountType["bank_id"];
      account_type_id?: AccountType["account_type_id"];
    }
  ): AccountType {
    const keys = Object.keys(item);

    const columns = keys.map((item) => `${item} = ?`);
    const newValues = Object.values(item);

    return connection
      .prepare(`update account set ${columns} where id = ?`, [...newValues, id])
      .get() as AccountType;
  }
}