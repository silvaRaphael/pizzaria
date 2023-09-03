import { PizzaFlavor } from '../../../domain/entities/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../infrastructure/repositories/pizza-flavor-repository-impl';

export class GetAllPizzaFlavorsUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepositoryImpl) {}

  async execute(): Promise<PizzaFlavor[]> {
    try {
      return await this.pizzaFlavorRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
