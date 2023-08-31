import { PrismaClient } from '@prisma/client';

import { Client } from '../../domain/entities/client';
import { ClientRepository } from '../../domain/repositories/client-repository';

export class ClientRepositoryImpl implements ClientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(client: Client): Promise<void> {
    try {
      await this.prisma.client.create({
        data: client,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(clientId: string): Promise<Client> {
    try {
      return (await this.prisma.client.findFirst({
        where: {
          id: clientId,
        },
      })) as Client;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<Client[]> {
    try {
      return (await this.prisma.client.findMany({
        where: {
          active: true,
        },
      })) as Client[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
