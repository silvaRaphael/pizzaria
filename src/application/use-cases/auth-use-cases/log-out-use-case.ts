import { MissingDataError } from '../../errors/missing-data-error';
import { AuthRepository } from '../../repositories/auth-repository';
import { UserCredentialsDTO } from '../user-use-cases/user-credentials-dto';

export class LogOutUseCase {
	constructor(private authRepository: AuthRepository) {}

	async execute({ userId }: UserCredentialsDTO): Promise<void> {
		try {
			if (!userId) throw new MissingDataError('userId');

			await this.authRepository.logOut({ userId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
