import { Order } from '../entities/order';
import { UpdateOrderStatusDTO } from '../../application/use-cases/order-use-cases/update-order-status-dto';

export interface OrderRepository {
  create(order: Order): Promise<void>;
  getOne(orderId: string): Promise<Order>;
  getAll(): Promise<Order[]>;
  getAllFromClient(clientId: string): Promise<Order[]>;
  updateStatus({ order_id, status }: UpdateOrderStatusDTO): Promise<void>;
  delete(orderId: string): Promise<void>;
}
