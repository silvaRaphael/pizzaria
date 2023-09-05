import { PizzaTopping } from '../../../domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../infrastructure/repositories/pizza-topping-repository-impl';
import { UpdatePizzaToppingDTO } from './update-pizza-topping-dto';
import { MissingDataError } from '../../../interfaces/errors/missing-data-error';

export class UpdatePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepositoryImpl) {}

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
