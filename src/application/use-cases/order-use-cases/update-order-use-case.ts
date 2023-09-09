import { Order } from '../../../domain/order';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { MissingDataError } from '../../errors/missing-data-error';
import { OrderPizzaFlavorRepository } from '../../repositories/order-pizza-flavor-repository';
import { OrderPizzaToppingRepository } from '../../repositories/order-pizza-topping-repository';
import { OrderRepository } from '../../repositories/order-repository';
import { OrderOutputDTO } from './order-output-dto';
import { UpdateOrderDTO } from './update-order-dto';

export class UpdateOrderUseCase {
  pizzaFlavors: OrderPizzaFlavor[] = [];
  pizzaToppings: OrderPizzaTopping[] = [];

  constructor(
    private orderRepository: OrderRepository,
    private orderPizzaFlavor: OrderPizzaFlavorRepository,
    private orderPizzaTopping: OrderPizzaToppingRepository,
  ) {}

  async execute({
    id,
    client_id,
    size,
    price,
    pizzaFlavorsIds,
    pizzaToppingsIds,
  }: UpdateOrderDTO): Promise<OrderOutputDTO> {
    try {
      if (!id) throw new MissingDataError('id');
      if (!client_id) throw new MissingDataError('client_id');
      if (size == null) throw new MissingDataError('size');
      if (price == null) throw new MissingDataError('price');

      const order = new Order({
        id,
        client_id,
        size,
        price,
      });

      await Promise.all([
        this.orderRepository.update(order),
        this.orderPizzaFlavor.deleteByOrderId(id),
        this.orderPizzaTopping.deleteByOrderId(id),
      ]);

      pizzaFlavorsIds.map((flavor_id) =>
        this.pizzaFlavors.push(
          new OrderPizzaFlavor({
            order_id: id,
            flavor_id,
          }),
        ),
      );

      pizzaToppingsIds.map((topping_id) =>
        this.pizzaToppings.push(
          new OrderPizzaTopping({
            order_id: id,
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
