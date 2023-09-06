import { PizzaFlavor } from '../../../src/domain/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { UpdatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/update-pizza-flavor-use-case';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';

describe('Create Pizza Flavor UseCase', () => {
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let updatePizzaFlavorUseCase: UpdatePizzaFlavorUseCase;
  let pizzaFlavor: PizzaFlavor;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    updatePizzaFlavorUseCase = new UpdatePizzaFlavorUseCase(
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

  it('Should update pizza flavor', async () => {
    const response = await updatePizzaFlavorUseCase.execute({
      id: pizzaFlavor.id,
      flavor: 'test edited',
      price: 15.5,
    });

    expect(response).toBeInstanceOf(PizzaFlavor);
  });
});