import { AuthRepository } from '../../repositories/auth-repository';
import { UserCredentialsDTO } from '../user-use-cases/user-credentials-dto';

export class ValidateUserTokenUseCase {
	constructor(private authRepository: AuthRepository) {}

	async execute(token: string): Promise<UserCredentialsDTO | null> {
		try {
			return await this.authRepository.validateToken(token);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
