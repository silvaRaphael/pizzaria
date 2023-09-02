import { PizzaFlavorRepositoryImpl } from '../../infrastructure/repositories/pizza-flavor-repository-impl';

export class DeletePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepositoryImpl: PizzaFlavorRepositoryImpl) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.pizzaFlavorRepositoryImpl.delete(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
