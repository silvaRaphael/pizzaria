import { PizzaTopping } from '../../../domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../../infrastructure/repositories/pizza-topping-repository-impl';

export class GetPizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepositoryImpl) {}

  async execute(userId: string): Promise<PizzaTopping> {
    try {
      return await this.pizzaToppingRepository.getOne(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
