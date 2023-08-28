import { User } from '../../../domain/entities/user';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute(): Promise<User[]> {
    try {
      return await this.userRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
