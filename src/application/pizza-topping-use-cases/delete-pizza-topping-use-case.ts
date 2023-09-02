import { PizzaToppingRepositoryImpl } from '../../infrastructure/repositories/pizza-topping-repository-impl';

export class DeletePizzaToppingUseCase {
  constructor(private pizzaToppingRepositoryImpl: PizzaToppingRepositoryImpl) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.pizzaToppingRepositoryImpl.delete(userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
