import { PrismaClient } from '@prisma/client';

import { PizzaTopping } from '../../../src/domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { UpdatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/update-pizza-topping-use-case';
import { ClearDatabaseTests } from '../../../src/interfaces/utils/clear-database-tests';

describe('Create Pizza Topping UseCase', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let updatePizzaToppingUseCase: UpdatePizzaToppingUseCase;
  let pizzaTopping: PizzaTopping;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl(new PrismaClient());
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    updatePizzaToppingUseCase = new UpdatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    pizzaTopping = await createPizzaToppingUseCase.execute({
      topping: 'test' + new Date().getTime(),
      price: 20.9,
    });
    idsToDelete.push(pizzaTopping.id);
  });

  afterAll(
    async () =>
      await ClearDatabaseTests(new PrismaClient().pizzaTopping, idsToDelete),
  );

  it('Should update pizza topping', async () => {
    const response = await updatePizzaToppingUseCase.execute({
      id: pizzaTopping.id,
      topping: 'test edited',
      price: 15.5,
    });

    expect(response).toBeInstanceOf(PizzaTopping);
  });
});
