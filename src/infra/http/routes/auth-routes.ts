import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth-middleware';
import { AuthController } from '../controllers/auth-controller';
import { SignInUseCase } from '../../../application/use-cases/auth-use-cases/sign-in-use-case';
import { AuthRepositoryImpl } from '../../database/repositories/auth-repository-impl';
import { LogOutUseCase } from '../../../application/use-cases/auth-use-cases/log-out-use-case';

const router = Router();

const authRepository = new AuthRepositoryImpl();
const signInUseCase = new SignInUseCase(authRepository);
const logOutUseCase = new LogOutUseCase(authRepository);
const authController = new AuthController(signInUseCase, logOutUseCase);

router.post('/sign-in', (req, res) => {
	authController.signIn(req, res);
});

router.post('/logout', AuthMiddleware, (req, res) => {
	authController.logOut(req, res);
});

export default router;
