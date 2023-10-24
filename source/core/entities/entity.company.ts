export default interface CompanyEntity extends CompanyType {
  getId(): CompanyType["id"];
  setId(id: number): void;

  getCnpj(): string;
  setCnpj(cnpj: string): void;

  getFullName(): string;
  setFullName(fullName: string): void;

  getEmail(): string;
  setEmail(email: string): void;

  getPassword(): string;
  setPassword(password: string): void;
}

export type CompanyType = {
  id?: number;
  cnpj: string;
  fullName: string;
  email: string;
  password: string;
};
