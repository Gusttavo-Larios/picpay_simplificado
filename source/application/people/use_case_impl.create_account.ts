import { AssocPeopleAccountRepository } from "../../database/repositories/repository.assoc_people_account";
import { CreateAccountUseCaseImpl } from "../common/use_case_impl.create_account";

export default class CreatePeopleAccountUseCase
  extends CreateAccountUseCaseImpl
{
  linkOwnerAndAccount(ownerId: number, accountId: number): void {
    AssocPeopleAccountRepository.create(ownerId, accountId);
  }
}
