export interface AssocCompanyAccountEntity extends AssocCompanyAccountType {
    getCompanyId(): AssocCompanyAccountType["peopleId"];
    setCompanyId(peopleId: number): void;

    getAccountId(): AssocCompanyAccountType["accountId"];
    setAccountId(accountId: number): void;
  }
  
  export type AssocCompanyAccountType = {
    peopleId: number;
    accountId: number;
  };
  