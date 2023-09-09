import { Order } from '../../domain/order';
import { UpdateOrderStatusDTO } from '../use-cases/order-use-cases/update-order-status-dto';

export interface OrderRepository {
  create(order: Order): Promise<void>;
  getOne(orderId: string): Promise<Order>;
  getAll(): Promise<Order[]>;
  getAllFromClient(clientId: string): Promise<Order[]>;
  update(order: Order): Promise<void>;
  updateStatus({ id, status }: UpdateOrderStatusDTO): Promise<void>;
  delete(orderId: string): Promise<void>;
}
