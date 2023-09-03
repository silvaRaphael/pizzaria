import { PizzaTopping } from '../../../domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../infrastructure/repositories/pizza-topping-repository-impl';
import { CreatePizzaToppingDTO } from './create-pizza-topping-dto';
import { MissingDataError } from '../../../interfaces/errors/missing-data-error';

export class CreatePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepositoryImpl) {}

  async execute({
    topping,
    price,
  }: CreatePizzaToppingDTO): Promise<PizzaTopping> {
    try {
      if (!topping || !price) throw new MissingDataError();

      const pizzaTopping = new PizzaTopping({
        topping,
        price,
      });

      await this.pizzaToppingRepository.create(pizzaTopping);

      return pizzaTopping;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
