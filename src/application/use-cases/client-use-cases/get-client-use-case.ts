import { Client } from '../../../domain/entities/client';
import { ClientRepositoryImpl } from '../../../infrastructure/repositories/client-repository-impl';

export class GetClientUseCase {
  constructor(private clientRepository: ClientRepositoryImpl) {}

  async execute(clientId: string): Promise<Client> {
    try {
      return await this.clientRepository.getOne(clientId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
