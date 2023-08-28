import { hash } from 'bcryptjs';

import { User } from '../../../domain/entities/user';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';
import { CreateUserUseCaseDTO } from './create-user-dto';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute({
    username,
    name,
    password,
  }: CreateUserUseCaseDTO): Promise<User> {
    try {
      const passwordHash = await hash(password, 8);
      const user = new User({
        username,
        name,
        password: passwordHash,
      });
      await this.userRepository.create(user);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
