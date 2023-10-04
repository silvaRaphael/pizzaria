import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

import { AuthRepository } from '../../../application/repositories/auth-repository';
import { AuthenticateUserDTO } from '../../../application/use-cases/auth-use-cases/authenticate-user-dto';
import { UserCredentialsDTO } from '../../../application/use-cases/user-use-cases/user-credentials-dto';
import { prisma } from '../prisma';
import { DateTime } from '../../http/utils/datetime';
import { UserNotFoundError } from '../../../application/errors/user-not-found-error';
import { InvalidCredentialsError } from '../../../application/errors/invalid-credentials-error';

export class AuthRepositoryImpl implements AuthRepository {
	async signInWithUsernameAndPassword(
		credentials: AuthenticateUserDTO,
	): Promise<UserCredentialsDTO> {
		try {
			const user = await prisma.user.findFirst({
				where: {
					active: true,
					username: credentials.username,
				},
				select: {
					id: true,
					password: true,
					username: true,
				},
			});

			if (!user) throw new UserNotFoundError();

			if (!(await bcrypt.compare(credentials.password, user.password)))
				throw new InvalidCredentialsError('Senha incorreta');

			const now = DateTime();

			const token = randomUUID();
			const token_expiration = new Date(now.setHours(now.getHours() + 1));

			await prisma.user.update({
				data: {
					token,
					token_expiration,
				},
				where: {
					id: user.id,
				},
			});

			return { userId: user.id, username: user.username, token };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async logOut({ userId }: UserCredentialsDTO): Promise<void> {
		try {
			await prisma.user.update({
				data: {
					token: null,
					token_expiration: null,
				},
				where: {
					id: userId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async validateToken(token: string): Promise<UserCredentialsDTO | null> {
		try {
			const response = await prisma.user.findFirst({
				where: {
					token,
					token_expiration: {
						gt: DateTime(),
					},
				},
				select: {
					id: true,
				},
			});

			if (!response) return null;

			return { userId: response.id };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
