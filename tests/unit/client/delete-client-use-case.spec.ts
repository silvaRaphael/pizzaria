import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';
import { ClientRepositoryImpl } from '../../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { Client } from '../../../src/domain/client';
import { DeleteClientUseCase } from '../../../src/application/use-cases/client-use-cases/delete-client-use-case';

describe('Delete Client UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let deleteClientUseCase: DeleteClientUseCase;
  let client: Client;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    clientRepository = new ClientRepositoryImpl();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    deleteClientUseCase = new DeleteClientUseCase(clientRepository);
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

  afterAll(async () => await ClearDatabaseTests(prisma.client, idsToDelete));

  it('Should delete client', async () => {
    await expect(async () => {
      await deleteClientUseCase.execute(client.id);
    }).not.toThrow();
  });

  it('Should not delete client with wrong ID', async () => {
    await expect(async () => {
      await deleteClientUseCase.execute(client.id + 1);
    }).rejects.toThrowError();
  });
});
