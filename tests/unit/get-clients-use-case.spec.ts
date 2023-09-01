import { PrismaClient } from '@prisma/client';

import { Client } from '../../src/domain/entities/client';
import { ClientRepositoryImpl } from '../../src/infrastructure/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../src/application/use-cases/client-use-cases/create-client-use-case';
import { GetClientUseCase } from '../../src/application/use-cases/client-use-cases/get-client-use-case';
import { GetAllClientsUseCase } from '../../src/application/use-cases/client-use-cases/get-all-clients-use-case';
import { ClearDatabaseTests } from '../../src/interfaces/utils/clear-database-tests';

describe('Create Client UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let getClientUseCase: GetClientUseCase;
  let getAllClientsUseCase: GetAllClientsUseCase;
  let client: Client;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    clientRepository = new ClientRepositoryImpl(new PrismaClient());
    createClientUseCase = new CreateClientUseCase(clientRepository);
    getClientUseCase = new GetClientUseCase(clientRepository);
    getAllClientsUseCase = new GetAllClientsUseCase(clientRepository);
    client = await createClientUseCase.execute({
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
  });

  afterAll(
    async () =>
      await ClearDatabaseTests(new PrismaClient().client, idsToDelete),
  );

  it('Should get a client by id', async () => {
    const response = await getClientUseCase.execute(client.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all clients', async () => {
    const response = await getAllClientsUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });
});
