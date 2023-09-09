import { Client } from '../../../domain/client';
import { MissingDataError } from '../../errors/missing-data-error';
import { ClientRepository } from '../../repositories/client-repository';
import { UpdateClientDTO } from './update-client-dto';

export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
    name,
    phone,
    zip_code,
    street_address,
    street_number,
    reference,
    state_id,
    city_id,
  }: UpdateClientDTO): Promise<Client> {
    try {
      if (
        !id ||
        !name ||
        !phone ||
        !zip_code ||
        !street_address ||
        !street_number ||
        !reference ||
        !state_id ||
        !city_id
      )
        throw new MissingDataError();

      const client = new Client({
        id,
        name,
        phone,
        zip_code,
        street_address,
        street_number,
        reference,
        state_id,
        city_id,
      });

      await this.clientRepository.update(client);

      return client;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
