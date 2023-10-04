import { NextFunction, Request, Response } from 'express';

import { InvalidTokenError } from '../../../application/errors/invalid-token-error';
import { ValidateUserTokenUseCase } from '../../../application/use-cases/auth-use-cases/validate-user-token-use-case';
import { ExpiredTokenError } from '../../../application/errors/expired-token-error';
import { AuthRepositoryImpl } from '../../database/repositories/auth-repository-impl';

export const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const fullToken = req.headers.authorization;

		if (!fullToken) throw new InvalidTokenError('Token não enviado');

		const [, token] = fullToken.split(' ');

		if (!token) throw new InvalidTokenError();

		const response = await new ValidateUserTokenUseCase(
			new AuthRepositoryImpl(),
		).execute(token);

		if (!response) throw new ExpiredTokenError();

		(req as any).userId = response.userId;

		next();
	} catch (error: any) {
		res.status(error.statusCode).send({ error: error.message });
	}
};
