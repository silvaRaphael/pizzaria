import { Order } from '../../../domain/order';
import { OrderRepository } from '../../repositories/order-repository';

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order> {
    try {
      return (await this.orderRepository.getOne(orderId)) as Order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
