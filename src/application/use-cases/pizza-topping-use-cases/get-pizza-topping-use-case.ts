import { PizzaTopping } from '../../../domain/pizza-topping';
import { PizzaToppingRepository } from '../../repositories/pizza-topping-repository';

export class GetPizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepository) {}

  async execute(pizzaToppingId: string): Promise<PizzaTopping> {
    try {
      return await this.pizzaToppingRepository.getOne(pizzaToppingId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
