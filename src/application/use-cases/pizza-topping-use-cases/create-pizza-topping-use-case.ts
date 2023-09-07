import { PizzaToppingRepository } from '../../repositories/pizza-topping-repository';
import { CreatePizzaToppingDTO } from './create-pizza-topping-dto';
import { MissingDataError } from '../../errors/missing-data-error';
import { PizzaTopping } from '../../../domain/pizza-topping';

export class CreatePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepository) {}

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
