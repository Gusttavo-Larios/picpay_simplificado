export default interface AccountTypeEntity extends AccountTypeType {
  getId(): AccountTypeType["id"];
  setId(id: number): void;

  getType(): AccountTypeType["type"];
  setType(type: AccountTypeType["type"]): void;
}

export type AccountTypeType = {
  id: number;
  type: "PERSONAL" | "BUSINESS";
};
