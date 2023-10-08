import { Request, Response } from 'express';
import { SignInUseCase } from '../../../application/use-cases/auth-use-cases/sign-in-use-case';
import { LogOutUseCase } from '../../../application/use-cases/auth-use-cases/log-out-use-case';

export class AuthController {
	constructor(
		private signInUseCase: SignInUseCase,
		private logOutUseCase: LogOutUseCase,
	) {}

	async signIn(req: Request, res: Response): Promise<void> {
		const { username, password } = req.body;

		try {
			const auth = await this.signInUseCase.execute({
				username,
				password,
			});

			(req.session as any).token = auth.token;
			(req.session as any).userId = auth.userId;
			(req.session as any).username = auth.username;

			req.session.save(() => {
				res.status(200).json(auth);
			});
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async logOut(req: Request, res: Response): Promise<void> {
		const { userId } = req as any;

		try {
			await this.logOutUseCase.execute({ userId });

			req.session.destroy(() => {
				res.end();
			});
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}
}
