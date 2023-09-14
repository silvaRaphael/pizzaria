import { Client } from '../../src/domain/client';
import { ClientRepositoryImpl } from '../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../src/application/use-cases/client-use-cases/create-client-use-case';
import { GetClientUseCase } from '../../src/application/use-cases/client-use-cases/get-client-use-case';
import { GetAllClientsUseCase } from '../../src/application/use-cases/client-use-cases/get-all-clients-use-case';
import { UpdateClientUseCase } from '../../src/application/use-cases/client-use-cases/update-client-use-case';
import { DeleteClientUseCase } from '../../src/application/use-cases/client-use-cases/delete-client-use-case';

describe('Client', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let getClientUseCase: GetClientUseCase;
  let getAllClientsUseCase: GetAllClientsUseCase;
  let updateClientUseCase: UpdateClientUseCase;
  let deleteClientUseCase: DeleteClientUseCase;
  let client: Client;

  beforeAll(() => {
    clientRepository = new ClientRepositoryImpl();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    getClientUseCase = new GetClientUseCase(clientRepository);
    getAllClientsUseCase = new GetAllClientsUseCase(clientRepository);
    updateClientUseCase = new UpdateClientUseCase(clientRepository);
    deleteClientUseCase = new DeleteClientUseCase(clientRepository);
  });

  it('Should create a new client', async () => {
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
    console.log(client.id);

    expect(client).toBeInstanceOf(Client);
  });

  it('Should get a client by id', async () => {
    const response = await getClientUseCase.execute(client.id);
    console.log(client.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all clients', async () => {
    const response = await getAllClientsUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });

  it('Should update client with id', async () => {
    const reponse = await updateClientUseCase.execute({
      id: client.id,
      name: 'Test 2',
      phone: '5511900009999',
      zip_code: '12312312',
      street_address: 'Test',
      street_number: '123',
      reference: 'Test 2',
    });
    console.log(client.id);

    expect(reponse).toBeInstanceOf(Client);
    expect(reponse.name).toBe('Test 2');
    expect(reponse.phone).toBe('5511900009999');
    expect(reponse.reference).toBe('Test 2');
  });

  it('Should delete client', async () => {
    console.log(client.id);
    expect(async () => {
      await deleteClientUseCase.execute(client.id);
    }).not.toThrow();
  });

  it('Should not delete client with wrong ID', async () => {
    console.log(client.id);
    await expect(async () => {
      await deleteClientUseCase.execute(client.id + 1);
    }).rejects.toThrowError();
  });
});
