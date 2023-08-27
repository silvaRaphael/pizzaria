import { User } from '../../../domain/entities/user';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';

export class GetUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute(userId: string): Promise<User> {
    return await this.userRepository.getOne(userId);
  }
}
