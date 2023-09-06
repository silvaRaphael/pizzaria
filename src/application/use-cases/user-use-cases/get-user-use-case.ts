import { User } from '../../../domain/user';
import { UserRepository } from '../../repositories/user-repository';

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    try {
      return await this.userRepository.getOne(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
