import { ClientRepositoryImpl } from '../../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { CreateOrderUseCase } from '../../../src/application/use-cases/order-use-cases/create-order-use-case';
import { CreateOrderDTO } from '../../../src/application/use-cases/order-use-cases/create-order-dto';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { PizzaToppingRepositoryImpl } from '../../../src/infra/database/repositories/pizza-topping-repository-impl';
import { OrderRepositoryImpl } from '../../../src/infra/database/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../../src/infra/database/repositories/order-pizza-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../../src/infra/database/repositories/order-pizza-topping-repository-impl';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';
import { OrderPizzaRepositoryImpl } from '../../../src/infra/database/repositories/order-pizza-repository.impl';
import { GetOrderUseCase } from '../../../src/application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../../src/application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../../src/application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { Client } from '../../../src/domain/client';
import { PizzaFlavor } from '../../../src/domain/pizza-flavor';
import { PizzaTopping } from '../../../src/domain/pizza-topping';

describe('Create Order UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let createOrderUseCase: CreateOrderUseCase;
  let orderRepository: OrderRepositoryImpl;
  let orderPizzaRepository: OrderPizzaRepositoryImpl;
  let orderPizzaFlavor: OrderPizzaFlavorImpl;
  let orderPizzaTopping: OrderPizzaToppingImpl;
  let createOrderDTO: CreateOrderDTO;
  let getOrderUseCase: GetOrderUseCase;
  let getAllOrdersUseCase: GetAllOrdersUseCase;
  let getAllClientOrdersUseCase: GetAllClientOrdersUseCase;
  let idsToDelete: string[] = [];
  let orderPizzaIds: string[] = [];
  let pizzaOrdersPizzaFlavorsIds: string[] = [];
  let pizzaOrdersPizzaToppingsIds: string[] = [];
  let clientIds: string[] = [];
  let pizzaFlavorIds: string[] = [];
  let pizzaToppingIds: string[] = [];
  let order: any;
  let client: Client;
  let pizzaFlavor: PizzaFlavor;
  let pizzaTopping: PizzaTopping;

  beforeAll(async () => {
    clientRepository = new ClientRepositoryImpl();
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
    orderRepository = new OrderRepositoryImpl();
    orderPizzaRepository = new OrderPizzaRepositoryImpl();
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
      orderPizzaRepository,
      orderPizzaFlavor,
      orderPizzaTopping,
    );
    getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
    getAllClientOrdersUseCase = new GetAllClientOrdersUseCase(orderRepository);
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
    createOrderDTO = {
      client_id: client.id,
      price: 20.9,
      orderPizzas: [
        {
          size: 2,
          price: 200,
          ammount: 1,
          pizzaFlavorsIds: [pizzaFlavor.id],
          pizzaToppingsIds: [pizzaTopping.id],
        },
      ],
    };
    clientIds.push(client.id);
    pizzaFlavorIds.push(pizzaFlavor.id);
    pizzaToppingIds.push(pizzaTopping.id);
  });

  afterAll(async () => {
    await Promise.all([
      prisma.orderPizzaFlavor.deleteMany({
        where: {
          id: {
            in: pizzaOrdersPizzaFlavorsIds,
          },
        },
      }),
      prisma.orderPizzaTopping.deleteMany({
        where: {
          id: {
            in: pizzaOrdersPizzaToppingsIds,
          },
        },
      }),
    ]);
    await prisma.orderPizza.deleteMany({
      where: {
        order_id: {
          in: idsToDelete,
        },
      },
    });
    // await ClearDatabaseTests(prisma.pizzaFlavor, pizzaFlavorIds);
    // await ClearDatabaseTests(prisma.pizzaTopping, pizzaToppingIds);
    await ClearDatabaseTests(prisma.order, idsToDelete);
    // await ClearDatabaseTests(prisma.client, clientIds);
  });

  it('Should create a new order', async () => {
    order = await createOrderUseCase.execute(createOrderDTO);

    orderPizzaIds = order.orderPizzaIds;

    expect(order.id).toBeDefined();
  });

  it('Sould get all order from client', async () => {
    const orders = await getAllClientOrdersUseCase.execute(client.id);

    expect(orders.length).toBeGreaterThan(0);
    expect(orders.at(-1)?.id).toBe(order.id);
  });
});
