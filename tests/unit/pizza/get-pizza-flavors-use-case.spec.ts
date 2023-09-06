import { PrismaClient } from '@prisma/client';

import { PizzaFlavor } from '../../../src/domain/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { CreatePizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { GetPizzaFlavorUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/get-pizza-flavor-use-case';
import { GetAllPizzaFlavorsUseCase } from '../../../src/application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { prisma } from '../../../src/infra/database/prisma';

describe('Get Pizza Flavors UseCase', () => {
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let getPizzaFlavorUseCase: GetPizzaFlavorUseCase;
  let getAllPizzaFlavorsUseCase: GetAllPizzaFlavorsUseCase;
  let pizzaFlavor: PizzaFlavor;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    getPizzaFlavorUseCase = new GetPizzaFlavorUseCase(pizzaFlavorRepository);
    getAllPizzaFlavorsUseCase = new GetAllPizzaFlavorsUseCase(
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

  it('Should get a pizza flavor by id', async () => {
    const response = await getPizzaFlavorUseCase.execute(pizzaFlavor.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all pizza flavors', async () => {
    const response = await getAllPizzaFlavorsUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });
});
