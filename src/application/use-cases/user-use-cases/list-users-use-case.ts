import { User } from '../../../domain/entities/user';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';

export class ListUsersUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
