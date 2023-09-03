import { PrismaClient } from '@prisma/client';

import { PizzaFlavor } from '../../../src/domain/entities/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../src/infrastructure/repositories/pizza-flavor-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { CreatePizzaFlavorDTO } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-dto';
import { ClearDatabaseTests } from '../../../src/interfaces/utils/clear-database-tests';

describe('Create Pizza Flavor UseCase', () => {
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let pizzaFlavorData: CreatePizzaFlavorDTO;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl(new PrismaClient());
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    pizzaFlavorData = {
      flavor: 'test' + new Date().getTime(),
      price: 20.9,
    };
  });

  afterAll(
    async () =>
      await ClearDatabaseTests(new PrismaClient().pizzaFlavor, idsToDelete),
  );

  it('Should create a new pizza flavor', async () => {
    const pizzaFlavor = await createPizzaFlavorUseCase.execute(pizzaFlavorData);

    idsToDelete.push(pizzaFlavor.id);

    expect(pizzaFlavor).toBeInstanceOf(PizzaFlavor);
  });
});
