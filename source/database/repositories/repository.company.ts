import { CompanyType } from "../../core/entities/entity.company";

import connection from "../database.connection";

export default class CompanyRepository {
  static create(params: CompanyType): CompanyType {
    try {
      const company = connection.prepare(
        "insert into company(cnpj, full_name, email, password) values(?,?,?,?) returning *",
        [params.cnpj, params.fullName, params.email, params.password]
      ).get() as CompanyType;

      return company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
