import { Client } from '../../../src/domain/client';
import { ClientRepositoryImpl } from '../../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';
import { UpdateClientUseCase } from '../../../src/application/use-cases/client-use-cases/update-client-use-case';

describe('Update Client UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let updateClientUseCase: UpdateClientUseCase;
  let idsToDelete: string[] = [];
  let client: Client;

  beforeAll(async () => {
    clientRepository = new ClientRepositoryImpl();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    updateClientUseCase = new UpdateClientUseCase(clientRepository);
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

  it('Should create a new client', async () => {
    const reponse = await updateClientUseCase.execute({
      id: client.id,
      name: 'Test 2',
      phone: '5511900009999',
      zip_code: '12312312',
      street_address: 'Test',
      street_number: '123',
      reference: 'Test 2',
      city_id: '5200050',
      state_id: '52',
    });

    expect(reponse).toBeInstanceOf(Client);
    expect(reponse.name).toBe('Test 2');
    expect(reponse.phone).toBe('5511900009999');
    expect(reponse.reference).toBe('Test 2');
  });
});
