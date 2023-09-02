import { User } from '../../../domain/entities/user';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';
import { MissingDataError } from '../../../interfaces/errors/missing-data-error';
import { CreateUserDTO } from './create-user-dto';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute({ username, name, password }: CreateUserDTO): Promise<User> {
    try {
      if (!username || !name || !password) throw new MissingDataError();

      const user = new User({
        username,
        name,
        password,
      });

      await this.userRepository.create(user);

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
