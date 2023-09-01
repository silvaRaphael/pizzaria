import { UserRepositoryImpl } from '../../../infrastructure/repositories/user-repository-impl';
import { MissingDataError } from '../../../interfaces/errors/missing-data-error';
import { AuthenticateUserDTO } from './authenticate-user-dto';
import { UserCredentialsDTO } from './user-credentials-dto';

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepositoryImpl) {}

  async execute({
    username,
    password,
  }: AuthenticateUserDTO): Promise<UserCredentialsDTO> {
    try {
      if (!username || !password) throw new MissingDataError();

      return await this.userRepository.authenticateUser({ username, password });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
