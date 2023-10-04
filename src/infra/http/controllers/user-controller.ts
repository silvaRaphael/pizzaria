import { Request, Response } from 'express';
import fs from 'node:fs';

import { CreateUserUseCase } from '../../../application/use-cases/user-use-cases/create-user-use-case';
import { GetUserUseCase } from '../../../application/use-cases/user-use-cases/get-user-use-case';
import { GetAllUsersUseCase } from '../../../application/use-cases/user-use-cases/get-all-users-use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/user-use-cases/update-user-use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/user-use-cases/delete-user-use-case';
import { FormatDate } from '../utils/format-date';

export class UserController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private getUserUseCase: GetUserUseCase,
		private getAllUsersUseCase: GetAllUsersUseCase,
		private updateUserUseCase: UpdateUserUseCase,
		private deleteUserUseCase: DeleteUserUseCase,
	) {}

	async createUser(req: Request, res: Response): Promise<void> {
		const { username, name, password } = req.body;

		try {
			const user = await this.createUserUseCase.execute({
				username,
				name,
				password,
			});

			res.status(201).json({ id: user.id });
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async getUser(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		const myId = (req as any).userId;

		try {
			const user = await this.getUserUseCase.execute(userId);

			if (user.id == myId) (user as any).password = '';

			res.status(200).json(user);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await this.getAllUsersUseCase.execute();

			let actionsButton = fs.readFileSync(
				'views/partials/actions-dropdown.hbs',
				'utf8',
			);

			const response = users.map((item, index) => {
				let actions = actionsButton;
				actions = actions.replace('{{edit}}', `editUser('${item.id}')`);
				actions = actions.replace('{{delete}}', `deleteUser('${item.id}')`);

				return {
					...item,
					'#': index + 1,
					created_at: new FormatDate(item.created_at).fullFormat(),
					actions,
				};
			});

			res.status(200).json(response);
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		const { username, name, password } = req.body;

		try {
			await this.updateUserUseCase.execute({
				id: userId,
				username,
				name,
				password,
			});

			res.status(204).end();
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async deleteUser(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;

		try {
			await this.deleteUserUseCase.execute(userId);

			res.status(204).end();
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}
}
