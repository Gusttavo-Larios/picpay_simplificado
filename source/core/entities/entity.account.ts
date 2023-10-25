export default interface AccountEntity extends AccountType {
  getId(): AccountType["id"];
  setId(id: AccountType["id"]): void;

  getAccountNumber(): AccountType["accountNumber"];
  setAccountNumber(accountNumber: AccountType["accountNumber"]): void;

  getBankId(): AccountType["bankId"];
  setBankId(bankId: AccountType["bankId"]): void;
}

export type AccountType = {
  id: number;
  accountNumber: number;
  bankId: number;
};
