import { PizzaFlavorRepository } from '../../repositories/pizza-flavor-repository';

export class DeletePizzaFlavorUseCase {
  constructor(private pizzaFlavorRepository: PizzaFlavorRepository) {}

  async execute(pizzaFlavorId: string): Promise<void> {
    try {
      await this.pizzaFlavorRepository.delete(pizzaFlavorId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
