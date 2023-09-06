import { PizzaTopping } from '../../../src/domain/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../src/infra/database/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { UpdatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/update-pizza-topping-use-case';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';

describe('Create Pizza Topping UseCase', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let updatePizzaToppingUseCase: UpdatePizzaToppingUseCase;
  let pizzaTopping: PizzaTopping;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
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
    async () => await ClearDatabaseTests(prisma.pizzaTopping, idsToDelete),
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
