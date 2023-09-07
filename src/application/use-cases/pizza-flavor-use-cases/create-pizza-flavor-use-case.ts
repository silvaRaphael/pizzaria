import { PizzaFlavor } from '../../../domain/pizza-flavor';
import { MissingDataError } from '../../errors/missing-data-error';
import { PizzaFlavorRepository } from '../../repositories/pizza-flavor-repository';
import { CreatePizzaFlavorDTO } from './create-pizza-flavor-dto';

export class CreatePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepository) {}

  async execute({ flavor, price }: CreatePizzaFlavorDTO): Promise<PizzaFlavor> {
    try {
      if (!flavor || !price) throw new MissingDataError('flavor');
      if (!flavor || !price) throw new MissingDataError('price');

      const pizzaFlavor = new PizzaFlavor({
        flavor,
        price,
      });

      await this.pizzaFlavorRepository.create(pizzaFlavor);

      return pizzaFlavor;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
