import { MissingDataError } from '../../../infra/http/errors/missing-data-error';
import { OrderRepository } from '../../repositories/order-repository';
import { UpdateOrderStatusDTO } from './update-order-status-dto';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ order_id, status }: UpdateOrderStatusDTO): Promise<void> {
    try {
      if (!order_id) throw new MissingDataError('order_id');
      if (!status) throw new MissingDataError('status');

      await this.orderRepository.updateStatus({ order_id, status });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
