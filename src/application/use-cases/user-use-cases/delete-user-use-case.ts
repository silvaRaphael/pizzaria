import { UserRepository } from '../../repositories/user-repository';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.userRepository.delete(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
