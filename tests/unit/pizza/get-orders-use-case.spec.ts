import { PizzaSizes } from '../../../src/domain/order';
import { ClientRepositoryImpl } from '../../../src/infra/database/repositories/client-repository-impl';
import { CreateClientUseCase } from '../../../src/application/use-cases/client-use-cases/create-client-use-case';
import { CreateOrderUseCase } from '../../../src/application/use-cases/order-use-cases/create-order-use-case';
import { CreateOrderDTO } from '../../../src/application/use-cases/order-use-cases/create-order-dto';
import { OrderRepositoryImpl } from '../../../src/infra/database/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../../src/infra/database/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../../src/infra/database/repositories/order-pizza-topping-repository-impl';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { OrderOutputDTO } from '../../../src/application/use-cases/order-use-cases/order-output-dto';
import { GetOrderUseCase } from '../../../src/application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../../src/application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../../src/application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { PizzaToppingRepositoryImpl } from '../../../src/infra/database/repositories/pizza-topping-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { prisma } from '../../../src/infra/database/prisma';

describe('Get Order UseCase', () => {
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
    clientRepository = new ClientRepositoryImpl();
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
    orderPizzaFlavor = new OrderPizzaFlavorImpl();
    orderPizzaTopping = new OrderPizzaToppingImpl();
    orderRepository = new OrderRepositoryImpl();
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
