import { PrismaClient } from '@prisma/client';

import { Client } from '../../src/domain/entities/client';
import { ClientRepositoryImpl } from '../../src/infrastructure/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../src/application/use-cases/client-use-cases/create-client-use-case';
import { ClearDatabaseTests } from '../../src/interfaces/utils/clear-database-tests';

describe('Create Client UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    clientRepository = new ClientRepositoryImpl(new PrismaClient());
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });

  afterAll(
    async () =>
      await ClearDatabaseTests(new PrismaClient().client, idsToDelete),
  );

  it('Should create a new client', async () => {
    const client = await createClientUseCase.execute({
      name: 'Test',
      phone: '5511911112222',
      zip_code: '12312312',
      street_address: 'Test',
      street_number: '123',
      reference: 'Test',
      city_id: '5200050',
      state_id: '52',
    });

    idsToDelete.push(client.id);

    expect(client).toBeInstanceOf(Client);
  });
});
