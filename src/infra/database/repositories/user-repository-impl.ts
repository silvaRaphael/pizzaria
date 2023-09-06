import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';

import { prisma } from '../prisma';
import { User } from '../../../domain/user';
import { UserRepository } from '../../../application/repositories/user-repository';
import { AuthenticateUserDTO } from '../../../application/use-cases/user-use-cases/authenticate-user-dto';
import { UserCredentialsDTO } from '../../../application/use-cases/user-use-cases/user-credentials-dto';
import { UserNotFoundError } from '../../http/errors/user-not-found-error';
import { InvalidCredentialsError } from '../../http/errors/invalid-credentials-error';
import { DateTime } from '../../http/utils/datetime';

export class UserRepositoryImpl implements UserRepository {
  async create(user: User): Promise<void> {
    try {
      const userExists = await prisma.user.findFirst({
        where: {
          username: user.username,
        },
      });

      if (userExists) {
        throw new Error('Usuário já existe!');
      }

      await prisma.user.create({
        data: user,
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
        },
        orderBy: {
          name: 'asc',
        },
      })) as User[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async authenticateUser(
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

      return { userId: user.id, token };
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
            lt: new Date(),
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
