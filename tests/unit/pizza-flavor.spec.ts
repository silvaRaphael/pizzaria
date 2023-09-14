import { PizzaFlavor } from '../../src/domain/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../src/infra/database/repositories/pizza-flavor-repository-impl';
import { CreatePizzaFlavorUseCase } from '../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { GetPizzaFlavorUseCase } from '../../src/application/use-cases/pizza-flavor-use-cases/get-pizza-flavor-use-case';
import { GetAllPizzaFlavorsUseCase } from '../../src/application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { CreatePizzaFlavorDTO } from '../../src/application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-dto';
import { UpdatePizzaFlavorUseCase } from '../../src/application/use-cases/pizza-flavor-use-cases/update-pizza-flavor-use-case';
import { DeletePizzaFlavorUseCase } from '../../src/application/use-cases/pizza-flavor-use-cases/delete-pizza-flavor-use-case';

describe('Pizza Flavor', () => {
  let pizzaFlavorRepository: PizzaFlavorRepositoryImpl;
  let createPizzaFlavorUseCase: CreatePizzaFlavorUseCase;
  let getPizzaFlavorUseCase: GetPizzaFlavorUseCase;
  let getAllPizzaFlavorsUseCase: GetAllPizzaFlavorsUseCase;
  let updatePizzaFlavorUseCase: UpdatePizzaFlavorUseCase;
  let deletePizzaFlavorUseCase: DeletePizzaFlavorUseCase;
  let pizzaFlavor: PizzaFlavor;
  let pizzaFlavorData: CreatePizzaFlavorDTO;

  beforeAll(() => {
    pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
    createPizzaFlavorUseCase = new CreatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    getPizzaFlavorUseCase = new GetPizzaFlavorUseCase(pizzaFlavorRepository);
    getAllPizzaFlavorsUseCase = new GetAllPizzaFlavorsUseCase(
      pizzaFlavorRepository,
    );
    updatePizzaFlavorUseCase = new UpdatePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );
    deletePizzaFlavorUseCase = new DeletePizzaFlavorUseCase(
      pizzaFlavorRepository,
    );

    pizzaFlavorData = {
      flavor: 'test' + new Date().getTime(),
      price: 20.9,
    };
  });

  it('Should create a new pizza flavor', async () => {
    pizzaFlavor = await createPizzaFlavorUseCase.execute(pizzaFlavorData);

    expect(pizzaFlavor).toBeInstanceOf(PizzaFlavor);
  });

  it('Should get a pizza flavor by id', async () => {
    const response = await getPizzaFlavorUseCase.execute(pizzaFlavor.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all pizza flavors', async () => {
    const response = await getAllPizzaFlavorsUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });

  it('Should update pizza flavor', async () => {
    const response = await updatePizzaFlavorUseCase.execute({
      id: pizzaFlavor.id,
      flavor: 'test edited',
      price: 15.5,
    });

    expect(response).toBeInstanceOf(PizzaFlavor);
  });

  it('Should delete pizza flavor', async () => {
    expect(async () => {
      await deletePizzaFlavorUseCase.execute(pizzaFlavor.id);
    }).not.toThrow();
  });

  it('Should not delete pizza flavor with wrong ID', async () => {
    await expect(async () => {
      await deletePizzaFlavorUseCase.execute(pizzaFlavor.id + 1);
    }).rejects.toThrowError();
  });
});
