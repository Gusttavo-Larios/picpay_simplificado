export default interface BankEntity extends BankType {
  getId(): BankType["id"];
  setId(id: number): void;

  getCompe(): string;
  setCompe(compe: string): void;

  getName(): string;
  setName(fullName: string): void;
}

export type BankType = {
  id?: number;
  compe: number;
  name: string;
};
