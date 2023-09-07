import { PizzaFlavor } from '../../../domain/pizza-flavor';
import { MissingDataError } from '../../errors/missing-data-error';
import { PizzaFlavorRepository } from '../../repositories/pizza-flavor-repository';
import { UpdatePizzaFlavorDTO } from './update-pizza-flavor-dto';

export class UpdatePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepository) {}

  async execute({
    id,
    flavor,
    price,
  }: UpdatePizzaFlavorDTO): Promise<PizzaFlavor> {
    try {
      if (!id) throw new MissingDataError('id');
      if (!flavor) throw new MissingDataError('flavor');
      if (!price) throw new MissingDataError('price');

      const pizzaFlavor = new PizzaFlavor({
        id,
        flavor,
        price,
      });

      await this.pizzaFlavorRepository.update(pizzaFlavor);

      return pizzaFlavor;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
