import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user-repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          username: user.username,
        },
      });

      if (userExists) {
        throw new Error('Username already exists');
      }

      await this.prisma.user.create({
        data: user,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(userId: string): Promise<User> {
    return (await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })) as User;
  }

  async getAll(): Promise<User[]> {
    return (await this.prisma.user.findMany()) as User[];
  }
}
