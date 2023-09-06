import { PizzaToppingRepository } from '../../repositories/pizza-topping-repository';

export class DeletePizzaToppingUseCase {
  constructor(private pizzaToppingRepository: PizzaToppingRepository) {}

  async execute(pizzaToppingId: string): Promise<void> {
    try {
      await this.pizzaToppingRepository.delete(pizzaToppingId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
