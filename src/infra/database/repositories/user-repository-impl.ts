import { prisma } from '../prisma';
import { User } from '../../../domain/user';
import { UserRepository } from '../../../application/repositories/user-repository';

export class UserRepositoryImpl implements UserRepository {
	async create(user: User): Promise<void> {
		try {
			const userExists = await prisma.user.findFirst({
				where: {
					username: user.username,
					active: true,
				},
			});

			if (userExists) {
				throw new Error('Usuário já existe!');
			}

			await prisma.user.create({
				data: {
					id: user.id,
					username: user.username,
					name: user.name,
					password: user.password ?? '',
					active: user.active,
					token: user.token,
					token_expiration: user.token_expiration,
					created_at: user.created_at,
					updated_at: user.updated_at,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getOne(userId: string): Promise<User> {
		try {
			return (await prisma.user.findFirst({
				where: {
					id: userId,
				},
				select: {
					id: true,
					name: true,
					username: true,
				},
			})) as User;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getAll(): Promise<User[]> {
		try {
			return (await prisma.user.findMany({
				where: {
					active: true,
				},
				select: {
					id: true,
					name: true,
					username: true,
					created_at: true,
				},
				orderBy: {
					name: 'asc',
				},
			})) as User[];
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async update(user: User): Promise<void> {
		const data = {
			username: user.username,
			name: user.name,
			updated_at: user.updated_at,
		};

		if (user.password) (data as any).password = user.password;

		try {
			await prisma.user.update({
				where: {
					id: user.id,
				},
				data,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async delete(userId: string): Promise<void> {
		try {
			await prisma.user.update({
				data: {
					active: false,
				},
				where: {
					id: userId,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
