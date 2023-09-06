import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { InvalidTokenError } from '../errors/invalid-token-error';
import { ExpiredTokenError } from '../errors/expired-token-error';
import { UserRepositoryImpl } from '../../infra/repositories/user-repository-impl';
import { ValidateUserTokenUseCase } from '../../application/use-cases/user-use-cases/validate-user-token-use-case';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fullToken = req.headers.authorization;

    if (!fullToken) throw new InvalidTokenError('Token não enviado');

    const [, token] = fullToken.split(' ')[1];

    if (!token) throw new InvalidTokenError();

    const response = await new ValidateUserTokenUseCase(
      new UserRepositoryImpl(new PrismaClient()),
    ).execute(token);

    if (!response) throw new ExpiredTokenError();

    (res as any).userId = response.userId;

    next();
  } catch (error: any) {
    res.status(error.statusCode).send({ error: error.message });
  }
};
