import { Order } from '../../../domain/order';
import { OrderPizza } from '../../../domain/order-pizza';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { MissingDataError } from '../../errors/missing-data-error';
import { OrderPizzaFlavorRepository } from '../../repositories/order-pizza-flavor-repository';
import { OrderPizzaRepository } from '../../repositories/order-pizza-repository';
import { OrderPizzaToppingRepository } from '../../repositories/order-pizza-topping-repository';
import { OrderRepository } from '../../repositories/order-repository';
import { UpdateOrderDTO } from './update-order-dto';

export class UpdateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderPizzaRepository: OrderPizzaRepository,
    private orderPizzaFlavorRepository: OrderPizzaFlavorRepository,
    private orderPizzaToppingRepository: OrderPizzaToppingRepository,
  ) {}

  async execute({ id, price, orderPizzas }: UpdateOrderDTO): Promise<{
    id: string;
  }> {
    try {
      if (!id) throw new MissingDataError('id');
      if (price == null) throw new MissingDataError('price');

      const order = new Order({
        id,
        price,
      });

      await this.orderRepository.create(order);

      const pizzaOrders: OrderPizza[] = [];
      const pizzaOrdersPizzaFlavorsIds: OrderPizzaFlavor[] = [];
      const pizzaOrdersPizzaToppingsIds: OrderPizzaTopping[] = [];

      for (const item of orderPizzas) {
        const orderPizza = new OrderPizza({
          order_id: order.id,
          size: item.size,
          price: item.size,
          ammount: item.ammount,
        });
        pizzaOrders.push(orderPizza);

        item.pizzaFlavorsIds.forEach((item) => {
          pizzaOrdersPizzaFlavorsIds.push(
            new OrderPizzaFlavor({
              order_pizza_id: orderPizza.id,
              flavor_id: item,
            }),
          );
        });

        item.pizzaToppingsIds.forEach((item) => {
          pizzaOrdersPizzaToppingsIds.push(
            new OrderPizzaTopping({
              order_pizza_id: orderPizza.id,
              topping_id: item,
            }),
          );
        });
      }

      await Promise.all(
        pizzaOrders.map((item) => this.orderPizzaRepository.create(item)),
      );

      await Promise.all([
        ...pizzaOrdersPizzaFlavorsIds.map((item) =>
          this.orderPizzaFlavorRepository.create(item),
        ),
        ...pizzaOrdersPizzaToppingsIds.map((item) =>
          this.orderPizzaToppingRepository.create(item),
        ),
      ]);

      return { id: order.id };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
