import { PizzaFlavor } from '../../../src/domain/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { DeletePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/delete-pizza-flavor-use-case';
import { prisma } from '../../../src/infra/database/prisma';

describe('Delete Pizza Flavor UseCase', () => {
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let deletePizzaFlavorUseCase: DeletePizzaFlavorUseCase;
  let pizzaFlavor: PizzaFlavor;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    deletePizzaFlavorUseCase = new DeletePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    pizzaFlavor = await createPizzaFlavorUseCase.execute({
      flavor: 'test' + new Date().getTime(),
      price: 20.9,
    });
    idsToDelete.push(pizzaFlavor.id);
  });

  afterAll(
    async () => await ClearDatabaseTests(prisma.pizzaFlavor, idsToDelete),
  );

  it('Should delete pizza flavor', async () => {
    await expect(async () => {
      await deletePizzaFlavorUseCase.execute(pizzaFlavor.id);
    }).not.toThrow();
  });

  it('Should not delete pizza flavor with wrong ID', async () => {
    await expect(async () => {
      await deletePizzaFlavorUseCase.execute(pizzaFlavor.id + 1);
    }).rejects.toThrowError();
  });
});
