import { ClientRepository } from '../../../application/repositories/client-repository';
import { Client } from '../../../domain/client';
import { prisma } from '../prisma';

export class ClientRepositoryImpl implements ClientRepository {
  async create(client: Client): Promise<void> {
    try {
      await prisma.client.create({
        data: client,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(clientId: string): Promise<Client> {
    try {
      return (await prisma.client.findFirst({
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
      return (await prisma.client.findMany({
        where: {
          active: true,
        },
      })) as Client[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(client: Client): Promise<void> {
    const {
      name,
      phone,
      zip_code,
      state_id,
      city_id,
      street_address,
      street_number,
      reference,
    } = client;
    try {
      await prisma.client.update({
        where: {
          id: client.id,
        },
        data: {
          name,
          phone,
          zip_code,
          state_id,
          city_id,
          street_address,
          street_number,
          reference,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(clientId: string): Promise<void> {
    try {
      await prisma.client.delete({
        where: {
          id: clientId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
