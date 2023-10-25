import { AssocCompanyAccountType } from "../../core/entities/entity.assoc_company_account.ts";
import connection from "../database.connection";

export class AssocCompanyAccountRepository {
  static create(ownerId: number, accountId: number): AssocCompanyAccountType {
    return connection
      .prepare(
        `insert into assoc_company_account (company_id, account_id) values (?,?) returning *`,
        [ownerId, accountId]
      )
      .get() as AssocCompanyAccountType;
  }
}
