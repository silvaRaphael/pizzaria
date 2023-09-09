import { OrderPizzaTopping } from '../../domain/order-pizza-topping';

export interface OrderPizzaToppingRepository {
  create(orderSpecifications: OrderPizzaTopping): Promise<OrderPizzaTopping>;
  getOne(orderSpecificationsId: string): Promise<OrderPizzaTopping>;
  getAll(orderId: string): Promise<OrderPizzaTopping[]>;
  delete(orderSpecificationsId: string): Promise<void>;
  deleteByOrderId(orderId: string): Promise<void>;
}
