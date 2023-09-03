import { PrismaClient } from '@prisma/client';

import { PizzaSizes } from '../../../src/domain/entities/order';
import { ClientRepositoryImpl } from '../../../src/infrastructure/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { CreateOrderUseCase } from '../../../src/application/use-cases/order-use-cases/create-order-use-case';
import { CreateOrderDTO } from '../../../src/application/use-cases/order-use-cases/create-order-dto';
import { OrderRepositoryImpl } from '../../../src/infrastructure/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../../src/infrastructure/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../../src/infrastructure/repositories/order-pizza-topping-repository-impl';
import { ClearDatabaseTests } from '../../../src/interfaces/utils/clear-database-tests';
import { OrderOutputDTO } from '../../../src/application/use-cases/order-use-cases/order-output-dto';
import { GetOrderUseCase } from '../../../src/application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../../src/application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../../src/application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { PizzaFlavorRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-flavor-repository-impl';
import { PizzaToppingRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-topping-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';

describe('Get Order UseCase', () => {
  let prismaClient: PrismaClient;
  let clientRepository: ClientRepositoryImpl;
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let orderPizzaFlavor: OrderPizzaFlavorImpl;
  let orderPizzaTopping: OrderPizzaToppingImpl;
  let orderRepository: OrderRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let createOrderUseCase: CreateOrderUseCase;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let getOrderUseCase: GetOrderUseCase;
  let getAllOrdersUseCase: GetAllOrdersUseCase;
  let getAllClientOrdersUseCase: GetAllClientOrdersUseCase;
  let createOrderDTO: CreateOrderDTO;
  let order: OrderOutputDTO;
  let idsToDelete: string[] = [];
  let clientIds: string[] = [];
  let pizzaFlavorIds: string[] = [];
  let pizzaToppingIds: string[] = [];

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    clientRepository = new ClientRepositoryImpl(prismaClient);
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl(prismaClient);
    pizzaToppingRepository = new PizzaToppingRepositoryImpl(prismaClient);
    orderPizzaFlavor = new OrderPizzaFlavorImpl(prismaClient);
    orderPizzaTopping = new OrderPizzaToppingImpl(prismaClient);
    orderRepository = new OrderRepositoryImpl(prismaClient);
    createClientUseCase = new CreateClientUseCase(clientRepository);
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    getOrderUseCase = new GetOrderUseCase(orderRepository);
    getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
    getAllClientOrdersUseCase = new GetAllClientOrdersUseCase(orderRepository);
    createOrderUseCase = new CreateOrderUseCase(
      orderRepository,
      orderPizzaFlavor,
      orderPizzaTopping,
    );
    const [client, pizzaFlavor, pizzaTopping] = await Promise.all([
      createClientUseCase.execute({
        name: 'Test',
        phone: '5511911112222',
        zip_code: '12312312',
        street_address: 'Test',
        street_number: '123',
        reference: 'Test',
        city_id: '5200050',
        state_id: '52',
      }),
      createPizzaFlavorUseCase.execute({
        flavor: 'Calabresa',
        price: 40.5,
      }),
      createPizzaToppingUseCase.execute({
        topping: 'Queijo',
        price: 10,
      }),
    ]);
    createOrderDTO = {
      client_id: client.id,
      size: PizzaSizes.medium,
      price: 20.9,
      pizzaFlavorsIds: [pizzaFlavor.id],
      pizzaToppingsIds: [pizzaTopping.id],
    };
    order = await createOrderUseCase.execute(createOrderDTO);
    idsToDelete.push(order.id);
    clientIds.push(client.id);
    pizzaFlavorIds.push(pizzaFlavor.id);
    pizzaToppingIds.push(pizzaTopping.id);
  });

  afterAll(async () => {
    await Promise.all([
      prismaClient.orderPizzaFlavor.deleteMany({
        where: {
          order_id: {
            in: idsToDelete,
          },
        },
      }),
      prismaClient.orderPizzaTopping.deleteMany({
        where: {
          order_id: {
            in: idsToDelete,
          },
        },
      }),
    ]);
    await ClearDatabaseTests(prismaClient.pizzaFlavor, pizzaFlavorIds);
    await ClearDatabaseTests(prismaClient.pizzaTopping, pizzaToppingIds);
    await ClearDatabaseTests(prismaClient.order, idsToDelete);
    await ClearDatabaseTests(prismaClient.client, clientIds);
  });

  it('Should get an order by id', async () => {
    const response = await getOrderUseCase.execute(order.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all orders', async () => {
    const response = await getAllOrdersUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });

  it('Should get all orders by client id', async () => {
    const response = await getAllClientOrdersUseCase.execute(order.client_id);

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });

  it('Should get nothing with wrong client id', async () => {
    const response = await getAllClientOrdersUseCase.execute('fake-id');

    expect(response.length).toBe(0);
  });
});
