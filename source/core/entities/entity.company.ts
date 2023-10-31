export default interface CompanyEntity extends CompanyType {
  getId(): CompanyType["id"];
  setId(id: number): void;

  getCnpj(): string;
  setCnpj(cnpj: string): void;

  getFullName(): string;
  setFullName(full_name: string): void;

  getEmail(): string;
  setEmail(email: string): void;

  getPassword(): string;
  setPassword(password: string): void;
}

export type CompanyType = {
  id?: number;
  cnpj: string;
  full_name: string;
  email: string;
  password: string;
};
