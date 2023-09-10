import { ClientRepositoryImpl } from '../../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { CreateOrderUseCase } from '../../../src/application/use-cases/order-use-cases/create-order-use-case';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { PizzaToppingRepositoryImpl } from '../../../src/infra/database/repositories/pizza-topping-repository-impl';
import { OrderRepositoryImpl } from '../../../src/infra/database/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../../src/infra/database/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../../src/infra/database/repositories/order-pizza-topping-repository-impl';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';
import { OrderOutputDTO } from '../../../src/application/use-cases/order-use-cases/order-output-dto';
import { UpdateOrderUseCase } from '../../../src/application/use-cases/order-use-cases/update-order-use-case';
import { Client } from '../../../src/domain/client';
import { PizzaFlavor } from '../../../src/domain/pizza-flavor';
import { PizzaTopping } from '../../../src/domain/pizza-topping';

describe('Update Order UseCase', () => {
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
  let order: OrderOutputDTO;
  let updateOrderUseCase: UpdateOrderUseCase;
  let client: Client;
  let pizzaFlavor: PizzaFlavor;
  let pizzaFlavor2: PizzaFlavor;
  let pizzaTopping: PizzaTopping;
  let idsToDelete: string[] = [];
  let clientIds: string[] = [];
  let pizzaFlavorIds: string[] = [];
  let pizzaToppingIds: string[] = [];

  beforeAll(async () => {
    clientRepository = new ClientRepositoryImpl();
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
    orderRepository = new OrderRepositoryImpl();
    orderPizzaFlavor = new OrderPizzaFlavorImpl();
    orderPizzaTopping = new OrderPizzaToppingImpl();
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
    updateOrderUseCase = new UpdateOrderUseCase(
      orderRepository,
      orderPizzaFlavor,
      orderPizzaTopping,
    );
    [client, pizzaFlavor, pizzaTopping] = await Promise.all([
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
    order = await createOrderUseCase.execute({
      client_id: client.id,
      size: 2,
      price: 20.9,
      pizzaFlavorsIds: [pizzaFlavor.id],
      pizzaToppingsIds: [pizzaTopping.id],
    });
    pizzaFlavor2 = await createPizzaFlavorUseCase.execute({
      flavor: 'Chocolate',
      price: 25.9,
    });
    clientIds.push(client.id);
    pizzaFlavorIds.push(pizzaFlavor.id);
    pizzaFlavorIds.push(pizzaFlavor2.id);
    pizzaToppingIds.push(pizzaTopping.id);
    idsToDelete.push(order.id);
  });

  afterAll(async () => {
    await Promise.all([
      prisma.orderPizzaFlavor.deleteMany({
        where: {
          order_id: {
            in: idsToDelete,
          },
        },
      }),
      prisma.orderPizzaTopping.deleteMany({
        where: {
          order_id: {
            in: idsToDelete,
          },
        },
      }),
    ]);
    await ClearDatabaseTests(prisma.pizzaFlavor, pizzaFlavorIds);
    await ClearDatabaseTests(prisma.pizzaTopping, pizzaToppingIds);
    await ClearDatabaseTests(prisma.order, idsToDelete);
    await ClearDatabaseTests(prisma.client, clientIds);
  });

  it('Should update an order', async () => {
    expect(
      await updateOrderUseCase.execute({
        id: order.id,
        client_id: order.client_id,
        pizzaFlavorsIds: [pizzaFlavor2.id],
        pizzaToppingsIds: [pizzaTopping.id],
        price: 100,
        size: 2,
      }),
    ).toBeUndefined();
  });
});
