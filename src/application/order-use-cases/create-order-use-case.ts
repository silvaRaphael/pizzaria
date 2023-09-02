import { Order } from '../../domain/entities/order';
import { OrderRepositoryImpl } from '../../infrastructure/repositories/order-repository-impl';
import { OrderPizzaFlavorImpl } from '../../infrastructure/repositories/order-flavor-repository-impl';
import { OrderPizzaToppingImpl } from '../../infrastructure/repositories/order-pizza-topping-repository-impl';
import { OrderPizzaFlavor } from '../../domain/entities/order-pizza-flavor';
import { OrderPizzaTopping } from '../../domain/entities/order-pizza-topping';
import { CreateOrderDTO } from './create-order-dto';
import { CreateOrderOutputDTO } from './create-order-output-dto';

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepositoryImpl,
    private orderPizzaFlavor: OrderPizzaFlavorImpl,
    private orderPizzaTopping: OrderPizzaToppingImpl,
  ) {}

  async execute({
    client_id,
    size,
    price,
    pizzaFlavors,
    pizzaToppings,
  }: CreateOrderDTO): Promise<CreateOrderOutputDTO> {
    try {
      const order = new Order({
        client_id,
        size,
        price,
      });

      await this.orderRepository.create(order);

      const orderPizzaFlavors = pizzaFlavors.map((flavor_id) =>
        this.orderPizzaFlavor.create(
          new OrderPizzaFlavor({
            order_id: order.id,
            flavor_id,
          }),
        ),
      );

      const orderPizzaTopping = pizzaToppings.map((topping_id) =>
        this.orderPizzaTopping.create(
          new OrderPizzaTopping({
            order_id: order.id,
            topping_id,
          }),
        ),
      );

      await Promise.all([...orderPizzaFlavors, ...orderPizzaTopping]);

      return { ...order, pizzaFlavors, pizzaToppings };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
