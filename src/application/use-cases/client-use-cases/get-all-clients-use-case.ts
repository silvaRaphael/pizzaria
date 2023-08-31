import { Client } from '../../../domain/entities/client';
import { ClientRepositoryImpl } from '../../../infrastructure/repositories/client-repository-impl';

export class GetAllClientsUseCase {
  constructor(private clientRepository: ClientRepositoryImpl) {}

  async execute(): Promise<Client[]> {
    try {
      return await this.clientRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
