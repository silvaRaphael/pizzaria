import { PizzaTopping } from '../../../src/domain/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../src/infra/database/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { DeletePizzaToppingUseCase } from '../../../src/application/use-cases/pizza-topping-use-cases/delete-pizza-topping-use-case';
import { prisma } from '../../../src/infra/database/prisma';

describe('Delete Pizza Topping UseCase', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let deletePizzaToppingUseCase: DeletePizzaToppingUseCase;
  let pizzaTopping: PizzaTopping;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    deletePizzaToppingUseCase = new DeletePizzaToppingUseCase(
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

  it('Should delete pizza topping', async () => {
    await expect(async () => {
      await deletePizzaToppingUseCase.execute(pizzaTopping.id);
    }).not.toThrow();
  });

  it('Should not delete pizza topping with wrong ID', async () => {
    await expect(async () => {
      await deletePizzaToppingUseCase.execute(pizzaTopping.id + 1);
    }).rejects.toThrowError();
  });
});
