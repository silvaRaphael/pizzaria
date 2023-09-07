import { PizzaToppingRepository } from '../../repositories/pizza-topping-repository';
import { UpdatePizzaToppingDTO } from './update-pizza-topping-dto';
import { MissingDataError } from '../../errors/missing-data-error';
import { PizzaTopping } from '../../../domain/pizza-topping';

export class UpdatePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepository) {}

  async execute({
    id,
    topping,
    price,
  }: UpdatePizzaToppingDTO): Promise<PizzaTopping> {
    try {
      if (!id) throw new MissingDataError('id');
      if (!topping) throw new MissingDataError('topping');
      if (!price) throw new MissingDataError('price');

      const pizzaTopping = new PizzaTopping({
        id,
        topping,
        price,
      });

      await this.pizzaToppingRepository.update(pizzaTopping);

      return pizzaTopping;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
