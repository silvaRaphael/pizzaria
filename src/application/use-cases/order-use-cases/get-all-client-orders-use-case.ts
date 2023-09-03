import { Order } from '../../../domain/entities/order';
import { OrderRepositoryImpl } from '../../../infrastructure/repositories/order-repository-impl';

export class GetAllClientOrdersUseCase {
  constructor(private orderRepository: OrderRepositoryImpl) {}

  async execute(clientId: string): Promise<Order[]> {
    try {
      return await this.orderRepository.getAllFromClient(clientId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
