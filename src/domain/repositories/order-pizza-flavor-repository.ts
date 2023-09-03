import { OrderPizzaFlavor } from '../entities/order-pizza-flavor';

export interface OrderPizzaFlavorRepository {
  create(orderSpecifications: OrderPizzaFlavor): Promise<OrderPizzaFlavor>;
  getOne(orderSpecificationsId: string): Promise<OrderPizzaFlavor>;
  getAll(orderId: string): Promise<OrderPizzaFlavor[]>;
  delete(orderSpecificationsId: string): Promise<void>;
}