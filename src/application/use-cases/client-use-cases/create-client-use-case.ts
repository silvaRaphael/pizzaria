import { Client } from '../../../domain/client';
import { MissingDataError } from '../../errors/missing-data-error';
import { ClientRepository } from '../../repositories/client-repository';
import { CreateClientDTO } from './create-client-dto';

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

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
      if (!name) throw new MissingDataError('name');

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
