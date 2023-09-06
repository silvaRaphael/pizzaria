import { PizzaTopping } from '../../../domain/pizza-topping';
import { PizzaToppingRepository } from '../../repositories/pizza-topping-repository';

export class GetAllPizzaToppingsUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepository) {}

  async execute(): Promise<PizzaTopping[]> {
    try {
      return await this.pizzaToppingRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
