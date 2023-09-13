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
import { UpdateOrderUseCase } from '../../../src/application/use-cases/order-use-cases/update-order-use-case';

describe('Create Order UseCase', () => {
  let clientRepository: ClientRepositoryImpl;
  let createClientUseCase: CreateClientUseCase;
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let createOrderUseCase: CreateOrderUseCase;
  let updateOrderUseCase: UpdateOrderUseCase;
  let orderRepository: OrderRepositoryImpl;
  let orderPizzaRepository: OrderPizzaRepositoryImpl;
  let orderPizzaFlavor: OrderPizzaFlavorImpl;
  let orderPizzaTopping: OrderPizzaToppingImpl;
  let createOrderDTO: CreateOrderDTO;
  let getOrderUseCase: GetOrderUseCase;
  let getAllOrdersUseCase: GetAllOrdersUseCase;
  let getAllClientOrdersUseCase: GetAllClientOrdersUseCase;
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
    getOrderUseCase = new GetOrderUseCase(orderRepository);
    getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
    getAllClientOrdersUseCase = new GetAllClientOrdersUseCase(orderRepository);
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
    updateOrderUseCase = new UpdateOrderUseCase(
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
  });

  it('Should create a new order', async () => {
    order = await createOrderUseCase.execute({
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
    });

    expect(order.id).toBeDefined();
  });

  // it('Should update order by id', async () => {
  //   const response = await updateOrderUseCase.execute({
  //     id: order.id,
  //     price: 20.9,
  //     orderPizzas: [
  //       {
  //         size: 2,
  //         price: 200,
  //         ammount: 1,
  //         pizzaFlavorsIds: [pizzaFlavor.id],
  //         pizzaToppingsIds: [pizzaTopping.id],
  //       },
  //     ],
  //   });

  //   expect(response.id).toBeDefined();
  // });

  it('Should get order by id', async () => {
    const response = await getOrderUseCase.execute(order.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all orders', async () => {
    const response = await getAllOrdersUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });

  it('Should get all orders by client id', async () => {
    const response = await getAllClientOrdersUseCase.execute(client.id);

    expect(response.length).toBeGreaterThan(0);
    expect(response.at(-1)?.id).toBe(order.id);
  });

  it('Should get nothing with wrong client id', async () => {
    const response = await getAllClientOrdersUseCase.execute('fake-id');

    expect(response.length).toBe(0);
  });
});
