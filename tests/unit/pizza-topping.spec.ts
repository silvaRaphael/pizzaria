import { PizzaTopping } from '../../src/domain/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../src/infra/database/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingUseCase } from '../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { GetPizzaToppingUseCase } from '../../src/application/use-cases/pizza-topping-use-cases/get-pizza-topping-use-case';
import { GetAllPizzaToppingsUseCase } from '../../src/application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';
import { CreatePizzaToppingDTO } from '../../src/application/use-cases/pizza-topping-use-cases/create-pizza-topping-dto';
import { UpdatePizzaToppingUseCase } from '../../src/application/use-cases/pizza-topping-use-cases/update-pizza-topping-use-case';
import { DeletePizzaToppingUseCase } from '../../src/application/use-cases/pizza-topping-use-cases/delete-pizza-topping-use-case';

describe('Pizza Topping', () => {
  let pizzaToppingRepository: PizzaToppingRepositoryImpl;
  let createPizzaToppingUseCase: CreatePizzaToppingUseCase;
  let getPizzaToppingUseCase: GetPizzaToppingUseCase;
  let getAllPizzaToppingsUseCase: GetAllPizzaToppingsUseCase;
  let updatePizzaToppingUseCase: UpdatePizzaToppingUseCase;
  let deletePizzaToppingUseCase: DeletePizzaToppingUseCase;
  let pizzaTopping: PizzaTopping;
  let pizzaToppingData: CreatePizzaToppingDTO;

  beforeAll(() => {
    pizzaToppingRepository = new PizzaToppingRepositoryImpl();
    createPizzaToppingUseCase = new CreatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    getPizzaToppingUseCase = new GetPizzaToppingUseCase(pizzaToppingRepository);
    getAllPizzaToppingsUseCase = new GetAllPizzaToppingsUseCase(
      pizzaToppingRepository,
    );
    updatePizzaToppingUseCase = new UpdatePizzaToppingUseCase(
      pizzaToppingRepository,
    );
    deletePizzaToppingUseCase = new DeletePizzaToppingUseCase(
      pizzaToppingRepository,
    );

    pizzaToppingData = {
      topping: 'test' + new Date().getTime(),
      price: 20.9,
    };
  });

  it('Should create a new pizza topping', async () => {
    pizzaTopping = await createPizzaToppingUseCase.execute(pizzaToppingData);

    expect(pizzaTopping).toBeInstanceOf(PizzaTopping);
  });

  it('Should get a pizza topping by id', async () => {
    const response = await getPizzaToppingUseCase.execute(pizzaTopping.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all pizza toppings', async () => {
    const response = await getAllPizzaToppingsUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });

  it('Should update pizza topping', async () => {
    const response = await updatePizzaToppingUseCase.execute({
      id: pizzaTopping.id,
      topping: 'test edited',
      price: 15.5,
    });

    expect(response).toBeInstanceOf(PizzaTopping);
  });

  it('Should delete pizza topping', async () => {
    expect(async () => {
      await deletePizzaToppingUseCase.execute(pizzaTopping.id);
    }).not.toThrow();
  });

  it('Should not delete pizza topping with wrong ID', async () => {
    await expect(async () => {
      await deletePizzaToppingUseCase.execute(pizzaTopping.id + 1);
    }).rejects.toThrowError();
  });
});
