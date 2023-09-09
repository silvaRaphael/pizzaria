import { Client } from '../../../src/domain/client';
import { ClientRepositoryImpl } from '../../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';

describe('Create Client UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    clientRepository = new ClientRepositoryImpl();
    createClientUseCase = new CreateClientUseCase(clientRepository);
  });

  afterAll(async () => await ClearDatabaseTests(prisma.client, idsToDelete));

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
