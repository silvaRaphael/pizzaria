import { NextFunction, Request, Response } from 'express';

import { InvalidTokenError } from '../../../application/errors/invalid-token-error';
import { ValidateUserTokenUseCase } from '../../../application/use-cases/auth-use-cases/validate-user-token-use-case';
import { ExpiredTokenError } from '../../../application/errors/expired-token-error';
import { AuthRepositoryImpl } from '../../database/repositories/auth-repository-impl';

export const WebAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
	redirectTo?: string,
) => {
	try {
		const { token } = req.session as any;

		if (!token) throw new InvalidTokenError('Token não enviado');

		const response = await new ValidateUserTokenUseCase(
			new AuthRepositoryImpl(),
		).execute(token);

		if (!response) throw new ExpiredTokenError();

		next();
	} catch (error: any) {
		(req.session as any).errorMessage = error.message;

		req.session.save(() => {
			res.redirect(redirectTo ?? '/login');
		});
	}
};
