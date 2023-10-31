export default interface AccountEntity extends AccountType {
  getId(): AccountType["id"];
  setId(id: AccountType["id"]): void;

  getAccountNumber(): AccountType["accountNumber"];
  setAccountNumber(accountNumber: AccountType["accountNumber"]): void;

  getBankId(): AccountType["bankId"];
  setBankId(bankId: AccountType["bankId"]): void;

  getAmount(): AccountType["amount"];
  setAmount(amount: AccountType["amount"]): void

  getAccountTypeId(): AccountType["accountTypeId"];
  setAccountTypeId(accountTypeId: AccountType["accountTypeId"]): void
}

export type AccountType<T = undefined> = {
  id: number;
  accountNumber: number;
  amount: number;
  bankId: number;
  accountTypeId: number;
  accountType?: T
};
