import { CompanyType } from "../../core/entities/entity.company";
import { SqliteError } from "../../types/type.sqlite_error";

import connection from "../database.connection";

export default class CompanyRepository {
  static create(company: CompanyType) {
    try {
      connection.run(
        "insert into company(cnpj, full_name, email, password) values(?,?,?,?)",
        [company.cnpj, company.fullName, company.email, company.password]
      );

      return {
        message: "created",
      };
    } catch (error: SqliteError) {
      throw new Error(error.message);
    }
  }
}
