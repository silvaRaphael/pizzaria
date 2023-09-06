import { PizzaTopping } from '../../../src/domain/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../src/infra/database/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { CreatePizzaToppingDTO } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-dto';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';

describe('Create Pizza Topping UseCase', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let pizzaToppingData: CreatePizzaToppingDTO;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    pizzaToppingData = {
      topping: 'test' + new Date().getTime(),
      price: 11.9,
    };
  });

  afterAll(
    async () => await ClearDatabaseTests(prisma.pizzaTopping, idsToDelete),
  );

  it('Should create a new pizza topping', async () => {
    const pizzaTopping = await createPizzaToppingUseCase.execute(
      pizzaToppingData,
    );

    idsToDelete.push(pizzaTopping.id);

    expect(pizzaTopping).toBeInstanceOf(PizzaTopping);
  });
});
