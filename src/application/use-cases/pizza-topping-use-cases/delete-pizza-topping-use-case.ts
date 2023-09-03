import { PizzaToppingRepositoryImpl } from '../../../infrastructure/repositories/pizza-topping-repository-impl';

export class DeletePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepositoryImpl) {}

  async execute(pizzaToppingId: string): Promise<void> {
    try {
      await this.pizzaToppingRepository.delete(pizzaToppingId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
