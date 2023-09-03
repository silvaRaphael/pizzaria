import { Order } from '../../../domain/entities/order';
import { OrderRepositoryImpl } from '../../../infrastructure/repositories/order-repository-impl';

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepositoryImpl) {}

  async execute(orderId: string): Promise<Order> {
    try {
      return await this.orderRepository.getOne(orderId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
