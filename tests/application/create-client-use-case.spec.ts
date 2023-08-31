import { PrismaClient } from '@prisma/client';

import { Client } from '../../src/domain/entities/client';
import { ClientRepositoryImpl } from '../../src/infrastructure/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../src/application/use-cases/client-use-cases/create-client-use-case';
import { CreateClientDTO } from '../../src/application/use-cases/client-use-cases/create-client-dto';

describe('Create Client UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let clientData: CreateClientDTO;

  beforeAll(() => {
    clientRepository = new ClientRepositoryImpl(new PrismaClient());
    createClientUseCase = new CreateClientUseCase(clientRepository);
    clientData = {
      name: 'Test',
      phone: '5511911112222',
      zip_code: '12312312',
      street_address: 'Test',
      street_number: '123',
      reference: 'Test',
      city_id: '5200050',
      state_id: '52',
    };
  });

  it('Should create a new client', async () => {
    const response = await createClientUseCase.execute(clientData);

    expect(response).toBeInstanceOf(Client);
  });
});
