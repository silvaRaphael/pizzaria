import { Order } from '../../../domain/order';
import { OrderPizza } from '../../../domain/order-pizza';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { OrderRepository } from '../../repositories/order-repository';
import { OrderPizzaRepository } from '../../repositories/order-pizza-repository';
import { OrderPizzaFlavorRepository } from '../../repositories/order-pizza-flavor-repository';
import { OrderPizzaToppingRepository } from '../../repositories/order-pizza-topping-repository';
import { CreateOrderDTO } from './create-order-dto';
import { MissingDataError } from '../../errors/missing-data-error';

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderPizzaRepository: OrderPizzaRepository,
    private orderPizzaFlavorRepository: OrderPizzaFlavorRepository,
    private orderPizzaToppingRepository: OrderPizzaToppingRepository,
  ) {}

  async execute({ client_id, price, orderPizzas }: CreateOrderDTO): Promise<{
    id: string;
  }> {
    try {
      if (!client_id) throw new MissingDataError('client_id');
      if (price == null) throw new MissingDataError('price');

      const order = new Order({
        client_id,
        price,
      });

      await this.orderRepository.create(order);

      const pizzaOrders: OrderPizza[] = [];
      const pizzaOrdersPizzaFlavors: OrderPizzaFlavor[] = [];
      const pizzaOrdersPizzaToppings: OrderPizzaTopping[] = [];

      for (const item of orderPizzas) {
        const orderPizza = new OrderPizza({
          order_id: order.id,
          size: item.size,
          price: item.size,
          ammount: item.ammount,
        });
        pizzaOrders.push(orderPizza);

        item.pizzaFlavorsIds.forEach((pizzaFlavorsId) => {
          pizzaOrdersPizzaFlavors.push(
            new OrderPizzaFlavor({
              order_pizza_id: orderPizza.id,
              flavor_id: pizzaFlavorsId,
            }),
          );
        });

        item.pizzaToppingsIds.forEach((pizzaToppingsId) => {
          pizzaOrdersPizzaToppings.push(
            new OrderPizzaTopping({
              order_pizza_id: orderPizza.id,
              topping_id: pizzaToppingsId,
            }),
          );
        });
      }

      await Promise.all([
        ...pizzaOrders.map((pizzaOrder) =>
          this.orderPizzaRepository.create(pizzaOrder),
        ),
      ]);

      await Promise.all([
        ...pizzaOrdersPizzaFlavors.map((pizzaOrdersPizzaFlavor) =>
          this.orderPizzaFlavorRepository.create(pizzaOrdersPizzaFlavor),
        ),
        ...pizzaOrdersPizzaToppings.map((pizzaOrdersPizzaTopping) =>
          this.orderPizzaToppingRepository.create(pizzaOrdersPizzaTopping),
        ),
      ]);

      return { id: order.id };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
