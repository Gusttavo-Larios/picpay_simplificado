export default interface AccountEntity extends AccountType {
  getId(): AccountType["id"];
  setId(id: AccountType["id"]): void;

  getAccountNumber(): AccountType["account_number"];
  setAccountNumber(account_number: AccountType["account_number"]): void;

  getBankId(): AccountType["bank_id"];
  setBankId(bank_id: AccountType["bank_id"]): void;

  getAmount(): AccountType["amount"];
  setAmount(amount: AccountType["amount"]): void

  getAccountTypeId(): AccountType["account_type_id"];
  setAccountTypeId(account_type_id: AccountType["account_type_id"]): void
}

export type AccountType<T = undefined> = {
  id: number;
  account_number: number;
  amount: number;
  bank_id: number;
  account_type_id: number;
  account_type?: T
};
