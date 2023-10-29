export default interface TransactionCarriedOutEntity extends TransactionCarriedOutType {
  getId(): TransactionCarriedOutType["id"];
  setId(id: TransactionCarriedOutType["id"]): void;

  getOriginAccountId(): TransactionCarriedOutType["originAccountId"];
  setOriginAccountId(originAccountId: TransactionCarriedOutType["originAccountId"]): void;

  getTergetAccountId(): TransactionCarriedOutType["targetAccountId"];
  setTergetAccountId(targetAccountId: TransactionCarriedOutType["targetAccountId"]): void;

  getAmountId(): TransactionCarriedOutType["amount"];
  setAmountId(amount: TransactionCarriedOutType["amount"]): void;
}

export type TransactionCarriedOutType = {
  id: number;
  originAccountId: number;
  targetAccountId: number;
  amount: number;
};
