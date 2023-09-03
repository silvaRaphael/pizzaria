import { PizzaFlavorRepositoryImpl } from '../../../infrastructure/repositories/pizza-flavor-repository-impl';

export class DeletePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepositoryImpl) {}

  async execute(pizzaFlavorId: string): Promise<void> {
    try {
      await this.pizzaFlavorRepository.delete(pizzaFlavorId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
