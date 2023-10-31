import CompanyEntity from "../../core/entities/entity.company";

export default class CompanyEntityImpl implements CompanyEntity {
  id?: number | undefined;
  cnpj: string;
  full_name: string;
  email: string;
  password: string;

  constructor(
    cnpj: string,
    full_name: string,
    email: string,
    password: string,
    id?: number | undefined
  ) {
    this.cnpj = cnpj;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  getId(): number | undefined {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }

  getCnpj(): string {
    return this.cnpj;
  }
  setCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }

  getFullName(): string {
    return this.full_name;
  }
  setFullName(full_name: string): void {
    this.full_name = full_name;
  }

  getEmail(): string {
    return this.email;
  }
  setEmail(email: string): void {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }
  setPassword(password: string): void {
    this.password = password;
  }
}
