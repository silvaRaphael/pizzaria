import { PrismaClient } from '@prisma/client';

import { PizzaSizes } from '../../../src/domain/entities/order';
import { ClientRepositoryImpl } from '../../../src/infrastructure/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { CreatePizzaFlavorUseCase } from '../../../src/application/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaToppingUseCase } from '../../../src/application/pizza-topping-use-cases/create-pizza-topping-use-case';
import { CreateOrderUseCase } from '../../../src/application/order-use-cases/create-order-use-case';
import { CreateOrderDTO } from '../../../src/application/order-use-cases/create-order-dto';
import { PizzaFlavorRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-flavor-repository-impl';
import { PizzaToppingRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-topping-repository-impl';
import { OrderRepositoryImpl } from '../../../src/infrastructure/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../../src/infrastructure/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../../src/infrastructure/repositories/order-pizza-topping-repository-impl';
import { ClearDatabaseTests } from '../../../src/interfaces/utils/clear-database-tests';

describe('Create Order UseCase', () => {
  let prismaClient: PrismaClient;
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let createOrderUseCase: CreateOrderUseCase;
  let orderRepository: OrderRepositoryImpl;
  let orderPizzaFlavor: OrderPizzaFlavorImpl;
  let orderPizzaTopping: OrderPizzaToppingImpl;
  let createOrderDTO: CreateOrderDTO;
  let idsToDelete: string[] = [];
  let clientIds: string[] = [];
  let pizzaFlavorIds: string[] = [];
  let pizzaToppingIds: string[] = [];

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    clientRepository = new ClientRepositoryImpl(prismaClient);
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl(prismaClient);
    pizzaToppingRepository = new PizzaToppingRepositoryImpl(prismaClient);
    orderRepository = new OrderRepositoryImpl(prismaClient);
    orderPizzaFlavor = new OrderPizzaFlavorImpl(prismaClient);
    orderPizzaTopping = new OrderPizzaToppingImpl(prismaClient);
    createClientUseCase = new CreateClientUseCase(clientRepository);
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
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
      pizzaFlavors: [pizzaFlavor.id],
      pizzaToppings: [pizzaTopping.id],
    };
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

  it('Should create a new order', async () => {
    const order = await createOrderUseCase.execute(createOrderDTO);

    idsToDelete.push(order.id);

    expect(order.id).toBeDefined();
  });
});
