import { PizzaFlavor } from '../../../domain/pizza-flavor';
import { PizzaFlavorRepository } from '../../repositories/pizza-flavor-repository';

export class GetAllPizzaFlavorsUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepository) {}

  async execute(): Promise<PizzaFlavor[]> {
    try {
      return await this.pizzaFlavorRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
