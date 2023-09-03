import { OrderPizzaTopping } from '../entities/order-pizza-topping';

export interface OrderPizzaToppingRepository {
  create(orderSpecifications: OrderPizzaTopping): Promise<OrderPizzaTopping>;
  getOne(orderSpecificationsId: string): Promise<OrderPizzaTopping>;
  getAll(orderId: string): Promise<OrderPizzaTopping[]>;
  delete(orderSpecificationsId: string): Promise<void>;
}
