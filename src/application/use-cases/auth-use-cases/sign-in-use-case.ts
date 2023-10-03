import { MissingDataError } from '../../errors/missing-data-error';
import { AuthRepository } from '../../repositories/auth-repository';
import { UserCredentialsDTO } from '../user-use-cases/user-credentials-dto';
import { AuthenticateUserDTO } from './authenticate-user-dto';

export class SignInUseCase {
	constructor(private authRepository: AuthRepository) {}

	async execute({
		username,
		password,
	}: AuthenticateUserDTO): Promise<UserCredentialsDTO> {
		try {
			if (!username) throw new MissingDataError('username');
			if (!password) throw new MissingDataError('password');

			return await this.authRepository.signInWithUsernameAndPassword({
				username,
				password,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
