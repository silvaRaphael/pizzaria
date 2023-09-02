import { PrismaClient } from '@prisma/client';

import { PizzaTopping } from '../../../src/domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../../src/application/pizza-topping-use-cases/create-pizza-topping-use-case';
import { ClearDatabaseTests } from '../../../src/interfaces/utils/clear-database-tests';
import { GetPizzaToppingUseCase } from '../../../src/application/pizza-topping-use-cases/get-pizza-topping-use-case';
import { GetAllPizzaToppingsUseCase } from '../../../src/application/pizza-topping-use-cases/get-all-pizza-toppings-use-case';

describe('Get Pizza Toppings UseCase', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let getPizzaToppingUseCase: GetPizzaToppingUseCase;
  let getAllPizzaToppingsUseCase: GetAllPizzaToppingsUseCase;
  let pizzaTopping: PizzaTopping;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl(new PrismaClient());
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    getPizzaToppingUseCase = new GetPizzaToppingUseCase(pizzaToppingRepository);
    getAllPizzaToppingsUseCase = new GetAllPizzaToppingsUseCase(
      pizzaToppingRepository,
    );
    pizzaTopping = await createPizzaToppingUseCase.execute({
      topping: 'test' + new Date().getTime(),
      price: 11.9,
    });
    idsToDelete.push(pizzaTopping.id);
  });

  afterAll(
    async () =>
      await ClearDatabaseTests(new PrismaClient().pizzaTopping, idsToDelete),
  );

  it('Should get a pizza topping by id', async () => {
    const response = await getPizzaToppingUseCase.execute(pizzaTopping.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all pizza toppings', async () => {
    const response = await getAllPizzaToppingsUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });
});
