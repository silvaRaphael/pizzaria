import { User } from '../../../domain/user';
import { MissingDataError } from '../../errors/missing-data-error';
import { UserRepository } from '../../repositories/user-repository';
import { CreateUserDTO } from './create-user-dto';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ username, name, password }: CreateUserDTO): Promise<User> {
    try {
      if (!username) throw new MissingDataError('username');
      if (!name) throw new MissingDataError('name');
      if (!password) throw new MissingDataError('password');

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
