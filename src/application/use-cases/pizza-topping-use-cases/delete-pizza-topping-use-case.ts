import { PizzaToppingRepositoryImpl } from '../../../infrastructure/repositories/pizza-topping-repository-impl';

export class DeletePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepositoryImpl) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.pizzaToppingRepository.delete(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
