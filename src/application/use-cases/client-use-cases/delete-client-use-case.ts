import { ClientRepository } from '../../repositories/client-repository';

export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string): Promise<void> {
    try {
      await this.clientRepository.delete(clientId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
