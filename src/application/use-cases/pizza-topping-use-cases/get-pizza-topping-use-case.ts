import { PizzaTopping } from '../../../domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../infrastructure/repositories/pizza-topping-repository-impl';

export class GetPizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepositoryImpl) {}

  async execute(pizzaToppingId: string): Promise<PizzaTopping> {
    try {
      return await this.pizzaToppingRepository.getOne(pizzaToppingId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
