import { UserRepository } from '../../repositories/user-repository';
import { AuthenticateUserDTO } from './authenticate-user-dto';
import { UserCredentialsDTO } from './user-credentials-dto';
import { MissingDataError } from '../../errors/missing-data-error';

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUserDTO): Promise<UserCredentialsDTO> {
    try {
      if (!username) throw new MissingDataError('username');
      if (!password) throw new MissingDataError('password');

      return await this.userRepository.authenticateUser({ username, password });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
