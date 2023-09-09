import { Order } from '../../../domain/order';
import { OrderRepository } from '../../repositories/order-repository';

export class GetAllClientOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(clientId: string): Promise<Order[]> {
    try {
      const a = await this.orderRepository.getAllFromClient(clientId);
      console.log(a);
      return a;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
