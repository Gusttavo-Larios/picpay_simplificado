import CompanyEntity from "../../core/entities/entity.company";

export default class CompanyEntityImpl implements CompanyEntity {
  id?: number | undefined;
  cnpj: string;
  fullName: string;
  email: string;
  password: string;

  constructor(
    cnpj: string,
    fullName: string,
    email: string,
    password: string,
    id?: number | undefined
  ) {
    this.cnpj = cnpj;
    this.fullName = fullName;
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
    return this.fullName;
  }
  setFullName(fullName: string): void {
    this.fullName = fullName;
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
