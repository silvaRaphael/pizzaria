import { Client } from '../../domain/client';

export interface ClientRepository {
  create(client: Client): Promise<void>;
  getOne(clientId: string): Promise<Client>;
  getAll(): Promise<Client[]>;
  update(client: Client): Promise<void>;
  delete(clientId: string): Promise<void>;
}
