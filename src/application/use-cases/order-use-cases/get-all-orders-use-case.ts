import { Order } from '../../../domain/order';
import { OrderFilterDTO } from '../../repositories/order-filter-dto';
import { OrderRepository } from '../../repositories/order-repository';

export class GetAllOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(filter?: OrderFilterDTO): Promise<Order[]> {
    try {
      return await this.orderRepository.getAll(filter);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
