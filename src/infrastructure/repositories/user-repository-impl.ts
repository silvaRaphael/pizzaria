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
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getOne(userId: string): Promise<User> {
    try {
      return (await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      })) as User;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return (await this.prisma.user.findMany()) as User[];
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
