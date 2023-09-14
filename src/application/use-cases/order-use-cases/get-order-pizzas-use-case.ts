import { OrderPizza } from '../../../domain/order-pizza';
import { OrderPizzaRepository } from '../../repositories/order-pizza-repository';

export class GetOrderPizzasUseCase {
  constructor(private orderPizzaRepository: OrderPizzaRepository) {}

  async execute(orderId: string): Promise<OrderPizza[]> {
    try {
      return await this.orderPizzaRepository.getAllFromOrder(orderId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
