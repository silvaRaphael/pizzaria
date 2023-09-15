import { orderStatus } from '../../../domain/order-status';
import { MissingDataError } from '../../errors/missing-data-error';
import { OrderPizzaRepository } from '../../repositories/order-pizza-repository';
import { UpdateOrderStatusDTO } from './update-order-status-dto';

export class UpdateOrderPizzasStatusUseCase {
  constructor(private orderPizzaRepository: OrderPizzaRepository) {}

  async execute({ id, status }: UpdateOrderStatusDTO): Promise<void> {
    try {
      if (!id) throw new MissingDataError('id');
      if (status == null) throw new MissingDataError('status');

      const done = status == orderStatus.at(-1)?.status;

      await this.orderPizzaRepository.updateStatus({
        id,
        status,
        done,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
