import { PrismaClient } from '@prisma/client';

import { Order } from '../../domain/entities/order';
import { OrderRepository } from '../../domain/repositories/order-repository';
import { UpdateOrderStatusDTO } from '../../application/use-cases/order-use-cases/update-order-status-dto';

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async create(order: Order): Promise<void> {
    try {
      await this.prisma.order.create({
        data: order,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(orderId: string): Promise<Order> {
    try {
      return (await this.prisma.order.findFirst({
        where: {
          done: false,
          id: orderId,
        },
      })) as Order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<Order[]> {
    try {
      return (await this.prisma.order.findMany({
        where: {
          done: false,
        },
      })) as Order[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllFromClient(clientId: string): Promise<Order[]> {
    try {
      return (await this.prisma.order.findMany({
        where: {
          client_id: clientId,
        },
      })) as Order[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateStatus({
    order_id,
    status,
  }: UpdateOrderStatusDTO): Promise<void> {
    try {
      await this.prisma.order.update({
        data: {
          status,
        },
        where: {
          id: order_id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(orderId: string): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: {
          id: orderId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
