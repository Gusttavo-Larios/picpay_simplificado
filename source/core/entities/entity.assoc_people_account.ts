export default interface AssocPeopleAccountEntity extends AssocPeopleAccountType {
    getPeopleId(): AssocPeopleAccountType["peopleId"];
    setPeopleId(peopleId: number): void;

    getAccountId(): AssocPeopleAccountType["accountId"];
    setAccountId(accountId: number): void;
  }
  
  export type AssocPeopleAccountType = {
    peopleId: number;
    accountId: number;
  };
  