export default interface PeopleEntity extends PeopleType {
    getId(): PeopleType["id"];
    setId(id: number): void;
  
    getCpf(): string;
    setCpf(cpf: string): void;
  
    getFullName(): string;
    setFullName(full_name: string): void;
  
    getEmail(): string;
    setEmail(email: string): void;
  
    getPassword(): string;
    setPassword(password: string): void;
  }
  
  export type PeopleType = {
    id?: number;
    cpf: string;
    full_name: string;
    email: string;
    password: string;
  };
  