import { Order } from '../../../domain/order';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { MissingDataError } from '../../errors/missing-data-error';
import { OrderPizzaFlavorRepository } from '../../repositories/order-pizza-flavor-repository';
import { OrderPizzaToppingRepository } from '../../repositories/order-pizza-topping-repository';
import { OrderRepository } from '../../repositories/order-repository';
import { UpdateOrderDTO } from './update-order-dto';

export class UpdateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderPizzaFlavor: OrderPizzaFlavorRepository,
    private orderPizzaTopping: OrderPizzaToppingRepository,
  ) {}

  async execute({
    id,
    size,
    price,
    pizzaFlavorsIds,
    pizzaToppingsIds,
  }: UpdateOrderDTO): Promise<void> {
    try {
      if (!id) throw new MissingDataError('id');
      if (size == null) throw new MissingDataError('size');
      if (price == null) throw new MissingDataError('price');

      const order = new Order({
        id,
        size,
        price,
      });

      await Promise.all([
        this.orderRepository.update(order),
        this.orderPizzaFlavor.deleteByOrderId(order.id),
        this.orderPizzaTopping.deleteByOrderId(order.id),
      ]);

      await Promise.all([
        Promise.all(
          pizzaFlavorsIds.map((flavor_id) =>
            this.orderPizzaFlavor.create(
              new OrderPizzaFlavor({
                order_id: id,
                flavor_id,
              }),
            ),
          ),
        ),
        Promise.all(
          pizzaToppingsIds.map((topping_id) =>
            this.orderPizzaTopping.create(
              new OrderPizzaTopping({
                order_id: id,
                topping_id,
              }),
            ),
          ),
        ),
      ]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
