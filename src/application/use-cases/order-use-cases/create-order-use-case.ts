import { Order } from '../../../domain/entities/order';
import { OrderRepositoryImpl } from '../../../infrastructure/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../../infrastructure/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../../infrastructure/repositories/order-pizza-topping-repository-impl';
import { OrderPizzaFlavor } from '../../../domain/entities/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/entities/order-pizza-topping';
import { CreateOrderDTO } from './create-order-dto';
import { MissingDataError } from '../../../interfaces/errors/missing-data-error';
import { OrderOutputDTO } from './order-output-dto';

export class CreateOrderUseCase {
  pizzaFlavors: OrderPizzaFlavor[] = [];
  pizzaToppings: OrderPizzaTopping[] = [];

  constructor(
    private orderRepository: OrderRepositoryImpl,
    private orderPizzaFlavor: OrderPizzaFlavorImpl,
    private orderPizzaTopping: OrderPizzaToppingImpl,
  ) {}

  async execute({
    client_id,
    size,
    price,
    pizzaFlavorsIds,
    pizzaToppingsIds,
  }: CreateOrderDTO): Promise<OrderOutputDTO> {
    try {
      if (!client_id) throw new MissingDataError('client_id');
      if (!size) throw new MissingDataError('size');
      if (!price) throw new MissingDataError('price');

      const order = new Order({
        client_id,
        size,
        price,
      });

      await this.orderRepository.create(order);

      pizzaFlavorsIds.map((flavor_id) =>
        this.pizzaFlavors.push(
          new OrderPizzaFlavor({
            order_id: order.id,
            flavor_id,
          }),
        ),
      );

      pizzaToppingsIds.map((topping_id) =>
        this.pizzaToppings.push(
          new OrderPizzaTopping({
            order_id: order.id,
            topping_id,
          }),
        ),
      );

      const orderPizzaFlavors = this.pizzaFlavors.map((pizzaFlavor) =>
        this.orderPizzaFlavor.create(pizzaFlavor),
      );

      const orderPizzaTopping = this.pizzaToppings.map((pizzaTopping) =>
        this.orderPizzaTopping.create(pizzaTopping),
      );

      const [orderPizzaFlavorsResponses, orderPizzaToppingsResponses] =
        await Promise.all([
          Promise.all(orderPizzaFlavors),
          Promise.all(orderPizzaTopping),
        ]);

      return {
        id: order.id,
        client_id: order.client_id,
        price: order.price,
        size: order.size,
        orderPizzaFlavor: orderPizzaFlavorsResponses.map(
          (orderPizzaFlavor) => orderPizzaFlavor,
        ),
        orderPizzaTopping: orderPizzaToppingsResponses.map(
          (orderPizzaFlavor) => orderPizzaFlavor,
        ),
      } as OrderOutputDTO;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
