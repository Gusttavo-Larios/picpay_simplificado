import { AssocPeopleAccountType } from "../../core/entities/entity.assoc_people_account";
import connection from "../database.connection";

export class AssocPeopleAccountRepository {
  static create(ownerId: number, accountId: number): AssocPeopleAccountType {
    return connection
      .prepare(
        `insert into assoc_company_account (company_id, account_id) values (?,?) returning *`,
        [ownerId, accountId]
      )
      .get() as AssocPeopleAccountType;
  }
}
