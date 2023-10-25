export default interface PeopleEntity extends PeopleType {
    getId(): PeopleType["id"];
    setId(id: number): void;
  
    getCpf(): string;
    setCpf(cpf: string): void;
  
    getFullName(): string;
    setFullName(fullName: string): void;
  
    getEmail(): string;
    setEmail(email: string): void;
  
    getPassword(): string;
    setPassword(password: string): void;
  }
  
  export type PeopleType = {
    id?: number;
    cpf: string;
    fullName: string;
    email: string;
    password: string;
  };
  