import { ClientRepository } from '../../../application/repositories/client-repository';
import { Client } from '../../../domain/client';
import { prisma } from '../prisma';

export class ClientRepositoryImpl implements ClientRepository {
  async create(client: Client): Promise<void> {
    try {
      await prisma.client.create({
        data: {
          id: client.id,
          name: client.name,
          phone: client.phone,
          zip_code: client.zip_code,
          state_id: client.state_id,
          city_id: client.city_id,
          street_address: client.street_address,
          street_number: client.street_number,
          reference: client.reference,
          active: client.active,
          created_at: client.created_at,
          updated_at: client.updated_at,
        },
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
        select: {
          id: true,
          name: true,
          phone: true,
          street_address: true,
          street_number: true,
          state_id: true,
          city_id: true,
        },
      })) as Client[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(client: Client): Promise<void> {
    try {
      await prisma.client.update({
        where: {
          id: client.id,
        },
        data: {
          name: client.name,
          phone: client.phone,
          zip_code: client.zip_code,
          state_id: client.state_id,
          city_id: client.city_id,
          street_address: client.street_address,
          street_number: client.street_number,
          reference: client.reference,
          updated_at: client.updated_at,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(clientId: string): Promise<void> {
    try {
      await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          active: false,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
