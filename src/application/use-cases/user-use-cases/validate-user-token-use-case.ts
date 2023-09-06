import { UserRepository } from '../../repositories/user-repository';
import { UserCredentialsDTO } from './user-credentials-dto';

export class ValidateUserTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<UserCredentialsDTO | null> {
    try {
      return await this.userRepository.validateToken(token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
