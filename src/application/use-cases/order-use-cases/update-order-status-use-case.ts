import { MissingDataError } from '../../errors/missing-data-error';
import { OrderRepository } from '../../repositories/order-repository';
import { UpdateOrderStatusDTO } from './update-order-status-dto';

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ id, status }: UpdateOrderStatusDTO): Promise<void> {
    try {
      if (!id) throw new MissingDataError('id');
      if (!status) throw new MissingDataError('status');

      await this.orderRepository.updateStatus({ id, status });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
