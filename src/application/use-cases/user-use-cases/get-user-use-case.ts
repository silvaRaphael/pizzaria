import { User } from '../../../domain/entities/user';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';

export class GetUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute(userId: string): Promise<User> {
    try {
      return await this.userRepository.getOne(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
