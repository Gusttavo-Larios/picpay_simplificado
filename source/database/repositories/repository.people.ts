import { PeopleType } from "../../core/entities/entity.people.ts";

import connection from "../database.connection";

export default class PeopleRepository {
  static create(params: PeopleType): PeopleType {
    try {
      const people = connection.prepare(
        "insert into people(cpf, full_name, email, password) values(?,?,?,?) returning *",
        [params.cpf, params.full_name, params.email, params.password]
      ).get() as PeopleType;

      return people;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
