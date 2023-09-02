import { Order } from '../entities/order';

export interface OrderRepository {
  create(order: Order): Promise<void>;
  getOne(orderId: string): Promise<Order>;
  getAll(): Promise<Order[]>;
  updateStatus({
    orderId,
    status,
  }: {
    orderId: string;
    status: number;
  }): Promise<void>;
  delete(orderId: string): Promise<void>;
}
