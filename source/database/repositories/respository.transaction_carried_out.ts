import { RepositoryInterface } from "../../interfaces/interface.repository";
import { TransactionCarriedOutType } from "../../core/entities/entity.transaction_carried_out";
import connection from "../database.connection";

export default class TransactionCarriedOutRepository
  implements RepositoryInterface<TransactionCarriedOutType>
{
  create({
    originAccountId,
    targetAccountId,
    amount,
  }: Omit<TransactionCarriedOutType, "id">): TransactionCarriedOutType {
    const transactionCarriedOut = connection
      .prepare(
        `insert into transaction_carried_out (origin_account_id, target_account_id, amount) values (?,?,?) RETURNING *`,
        [originAccountId, targetAccountId, amount]
      )
      .get() as TransactionCarriedOutType;

    return transactionCarriedOut;
  }
}
