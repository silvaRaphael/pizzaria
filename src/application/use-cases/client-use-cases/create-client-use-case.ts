import { Client } from '../../../domain/entities/client';

import { ClientRepositoryImpl } from '../../../infrastructure/repositories/client-repository-impl';
import { CreateClientDTO } from './create-client-dto';

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepositoryImpl) {}

  async execute({
    name,
    phone,
    zip_code,
    street_address,
    street_number,
    reference,
    state_id,
    city_id,
  }: CreateClientDTO): Promise<Client> {
    try {
      if (
        !name ||
        !phone ||
        !zip_code ||
        !street_address ||
        !street_number ||
        !reference ||
        !state_id ||
        !city_id
      ) {
        throw new Error('Dados faltando!');
      }
      const client = new Client({
        name,
        phone,
        zip_code,
        street_address,
        street_number,
        reference,
        state_id,
        city_id,
      });
      await this.clientRepository.create(client);
      return client;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
