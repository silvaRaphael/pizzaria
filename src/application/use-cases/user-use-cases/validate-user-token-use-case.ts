import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';
import { UserCredentialsDTO } from './user-credentials-dto';

export class ValidateUserTokenUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute(token: string): Promise<UserCredentialsDTO | null> {
    try {
      return await this.userRepository.validateToken(token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
