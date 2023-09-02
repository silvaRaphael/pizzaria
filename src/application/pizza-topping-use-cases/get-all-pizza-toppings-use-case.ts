import { PizzaTopping } from '../../domain/entities/pizza-topping';
import { PizzaToppingRepositoryImpl } from '../../infrastructure/repositories/pizza-topping-repository-impl';

export class GetAllPizzaToppingsUseCase {
  constructor(private pizzaToppingRepositoryImpl: PizzaToppingRepositoryImpl) {}

  async execute(): Promise<PizzaTopping[]> {
    try {
      return await this.pizzaToppingRepositoryImpl.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
