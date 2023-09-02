import { PizzaFlavor } from '../../domain/entities/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../infrastructure/repositories/pizza-flavor-repository-impl';

export class GetAllPizzaFlavorsUseCase {
  constructor(private pizzaFlavorRepositoryImpl: PizzaFlavorRepositoryImpl) {}

  async execute(): Promise<PizzaFlavor[]> {
    try {
      return await this.pizzaFlavorRepositoryImpl.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
