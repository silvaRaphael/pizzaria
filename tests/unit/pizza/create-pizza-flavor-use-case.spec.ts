import { PizzaFlavor } from '../../../src/domain/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaFlavorDTO } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-dto';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';

describe('Create Pizza Flavor UseCase', () => {
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let pizzaFlavorData: CreatePizzaFlavorDTO;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    pizzaFlavorData = {
      flavor: 'test' + new Date().getTime(),
      price: 20.9,
    };
  });

  afterAll(
    async () => await ClearDatabaseTests(prisma.pizzaFlavor, idsToDelete),
  );

  it('Should create a new pizza flavor', async () => {
    const pizzaFlavor = await createPizzaFlavorUseCase.execute(pizzaFlavorData);

    idsToDelete.push(pizzaFlavor.id);

    expect(pizzaFlavor).toBeInstanceOf(PizzaFlavor);
  });
});
