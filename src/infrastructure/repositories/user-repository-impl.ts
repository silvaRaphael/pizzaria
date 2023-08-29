import { PrismaClient } from '@prisma/client';

import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user-repository';

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
}
