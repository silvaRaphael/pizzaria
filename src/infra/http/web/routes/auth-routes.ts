import { Router } from 'express';
import { AuthRepositoryImpl } from '../../../database/repositories/auth-repository-impl';
import { LogOutUseCase } from '../../../../application/use-cases/auth-use-cases/log-out-use-case';

const router = Router();

const authRepository = new AuthRepositoryImpl();
const logOutUseCase = new LogOutUseCase(authRepository);

router.get('/login', (req, res) => {
	res.render('pages/auth/login', {
		title: 'Login',
		errorMessage: (req.session as any).errorMessage,
	});
});

router.get('/sair', async (req, res) => {
	const { userId } = req.session as any;

	try {
		await logOutUseCase.execute({ userId });

		req.session.destroy(() => {
			return res.redirect('/login');
		});
	} catch (error: any) {
		return res.redirect('/login');
	}
});

export default router;
