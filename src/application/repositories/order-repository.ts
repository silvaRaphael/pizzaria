import { Order } from '../../domain/order';
import { UpdateOrderStatusDTO } from '../use-cases/order-use-cases/update-order-status-dto';
import { OrderFilterDTO } from './order-filter-dto';

export interface OrderRepository {
  create(order: Order): Promise<void>;
  getOne(orderId: string): Promise<Order>;
  getAll(filter?: OrderFilterDTO): Promise<Order[]>;
  getAllFromClient(clientId: string): Promise<Order[]>;
  updateStatus({ id, status }: UpdateOrderStatusDTO): Promise<void>;
  delete(orderId: string): Promise<void>;
}
