import { Order } from '../../../domain/order';
import { OrderRepository } from '../../repositories/order-repository';

export class GetAllOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    try {
      return await this.orderRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
