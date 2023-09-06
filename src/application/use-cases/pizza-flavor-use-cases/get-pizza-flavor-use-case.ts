import { PizzaFlavor } from '../../../domain/pizza-flavor';
import { PizzaFlavorRepository } from '../../repositories/pizza-flavor-repository';

export class GetPizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepository) {}

  async execute(pizzaFlavorId: string): Promise<PizzaFlavor> {
    try {
      return await this.pizzaFlavorRepository.getOne(pizzaFlavorId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
