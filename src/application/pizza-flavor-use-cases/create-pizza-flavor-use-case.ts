import { PizzaFlavor } from '../../domain/entities/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../infrastructure/repositories/pizza-flavor-repository-impl';
import { CreatePizzaFlavorDTO } from './create-pizza-flavor-dto';
import { MissingDataError } from '../../interfaces/errors/missing-data-error';

export class CreatePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepositoryImpl) {}

  async execute({ flavor, price }: CreatePizzaFlavorDTO): Promise<PizzaFlavor> {
    try {
      if (!flavor || !price) throw new MissingDataError();

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
