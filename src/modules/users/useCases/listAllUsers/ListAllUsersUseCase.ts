import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!this.usersRepository.findById(user_id).admin)
      throw new Error("User is not admin");

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
