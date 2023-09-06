import { Client } from '../../../domain/client';
import { ClientRepository } from '../../repositories/client-repository';

export class GetClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string): Promise<Client> {
    try {
      return await this.clientRepository.getOne(clientId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
