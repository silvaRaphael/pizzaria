import { Order } from '../../../domain/entities/order';
import { OrderRepositoryImpl } from '../../../infrastructure/repositories/order-repository-impl';

export class GetAllOrdersUseCase {
  constructor(private orderRepository: OrderRepositoryImpl) {}

  async execute(): Promise<Order[]> {
    try {
      return await this.orderRepository.getAll();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
