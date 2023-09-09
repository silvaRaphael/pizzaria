import { OrderRepository } from '../../repositories/order-repository';

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<void> {
    try {
      await this.orderRepository.delete(orderId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
