import { PizzaFlavor } from '../../../domain/entities/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../infrastructure/repositories/pizza-flavor-repository-impl';
import { UpdatePizzaFlavorDTO } from './update-pizza-flavor-dto';
import { MissingDataError } from '../../../interfaces/errors/missing-data-error';

export class UpdatePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepositoryImpl) {}

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
