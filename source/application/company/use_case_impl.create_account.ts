import { AssocCompanyAccountRepository } from "../../database/repositories/repository.assoc_company_account.ts";
import { CreateAccountUseCaseImpl } from "../common/use_case_impl.create_account.ts";

export default class CreateCompanyAccountUseCase extends CreateAccountUseCaseImpl {
  linkOwnerAndAccount(ownerId: number, accountId: number): void {
    AssocCompanyAccountRepository.create(ownerId, accountId);
  }
}
