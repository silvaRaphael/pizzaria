import { PrismaClient } from '@prisma/client';

import { PizzaTopping } from '../../../src/domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { CreatePizzaToppingDTO } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-dto';
import { ClearDatabaseTests } from '../../../src/interfaces/utils/clear-database-tests';

describe('Create Pizza Topping UseCase', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let pizzaToppingData: CreatePizzaToppingDTO;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl(new PrismaClient());
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    pizzaToppingData = {
      topping: 'test' + new Date().getTime(),
      price: 11.9,
    };
  });

  afterAll(
    async () =>
      await ClearDatabaseTests(new PrismaClient().pizzaTopping, idsToDelete),
  );

  it('Should create a new pizza topping', async () => {
    const pizzaTopping = await createPizzaToppingUseCase.execute(
      pizzaToppingData,
    );

    idsToDelete.push(pizzaTopping.id);

    expect(pizzaTopping).toBeInstanceOf(PizzaTopping);
  });
});
