import { PizzaTopping } from '../../domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../infrastructure/repositories/pizza-topping-repository-impl';

export class GetPizzaToppingUseCase {
  constructor(private pizzaToppingRepositoryImpl: PizzaToppingRepositoryImpl) {}

  async execute(userId: string): Promise<PizzaTopping> {
    try {
      return await this.pizzaToppingRepositoryImpl.getOne(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
