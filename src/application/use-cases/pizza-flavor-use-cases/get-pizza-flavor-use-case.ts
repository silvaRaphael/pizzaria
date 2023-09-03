import { PizzaFlavor } from '../../../domain/entities/pizza-flavor';
import { PizzaFlavorRepositoryImpl } from '../../../infrastructure/repositories/pizza-flavor-repository-impl';

export class GetPizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepositoryImpl) {}

  async execute(userId: string): Promise<PizzaFlavor> {
    try {
      return await this.pizzaFlavorRepository.getOne(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
