import { OrderPizza } from '../../domain/order-pizza';
import { UpdateOrderStatusDTO } from '../use-cases/order-use-cases/update-order-status-dto';

export interface OrderPizzaRepository {
  create(orderPizza: OrderPizza): Promise<void>;
  getOne(orderPizzaId: string): Promise<OrderPizza>;
  getAll(): Promise<OrderPizza[]>;
  getAllFromOrder(orderPizzaId: string): Promise<OrderPizza[]>;
  update(orderPizza: OrderPizza): Promise<void>;
  updateStatus({ id, status }: UpdateOrderStatusDTO): Promise<void>;
  delete(orderPizzaId: string): Promise<void>;
}
