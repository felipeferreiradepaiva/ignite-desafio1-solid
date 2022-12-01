import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const created_at = new Date(Date.now());
    const updated_at = new Date(Date.now());
    Object.assign(user, {
      email,
      name,
      created_at,
      updated_at,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const findIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );
    this.users[findIndex].admin = true;
    this.users[findIndex].updated_at = new Date(Date.now());

    return this.users[findIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
