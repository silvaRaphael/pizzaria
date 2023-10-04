import { User } from '../../../domain/user';
import { MissingDataError } from '../../errors/missing-data-error';
import { UserRepository } from '../../repositories/user-repository';
import { UpdateUserDTO } from './update-user-dto';

export class UpdateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		id,
		username,
		name,
		password,
	}: UpdateUserDTO): Promise<User> {
		try {
			if (!id) throw new MissingDataError('username');
			if (!username) throw new MissingDataError('username');
			if (!name) throw new MissingDataError('name');

			const user = new User({
				id,
				username,
				name,
				password,
			});

			await this.userRepository.update(user);

			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
