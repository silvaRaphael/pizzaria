import { orderStatus } from '../../../domain/order-status';
import { MissingDataError } from '../../errors/missing-data-error';
import { OrderRepository } from '../../repositories/order-repository';
import { UpdateOrderStatusDTO } from './update-order-status-dto';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ id, status }: UpdateOrderStatusDTO): Promise<void> {
    try {
      if (!id) throw new MissingDataError('id');
      if (status == null) throw new MissingDataError('status');

      const done = status == orderStatus.at(-1)?.status;

      await this.orderRepository.updateStatus({ id, status, done });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
