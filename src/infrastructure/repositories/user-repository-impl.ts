import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';

import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user-repository';
import { AuthenticateUserDTO } from '../../application/use-cases/user-use-cases/authenticate-user-dto';
import { UserNotFoundError } from '../../interfaces/errors/user-not-found-error';
import { InvalidCredentialsError } from '../../interfaces/errors/invalid-credentials-error';
import { UserCredentialsDTO } from '../../application/use-cases/user-use-cases/user-credentials-dto';
import { DateTime } from '../../interfaces/utils/datatime';

export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          username: user.username,
        },
      });

      if (userExists) {
        throw new Error('Usuário já existe!');
      }

      await this.prisma.user.create({
        data: user,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(userId: string): Promise<User> {
    try {
      return (await this.prisma.user.findFirst({
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
      return (await this.prisma.user.findMany({
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
      const user = await this.prisma.user.findFirst({
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

      await this.prisma.user.update({
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
      const response = await this.prisma.user.findFirst({
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
