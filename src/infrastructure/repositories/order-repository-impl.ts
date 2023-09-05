import { PrismaClient } from '@prisma/client';

import { Order } from '../../domain/entities/order';
import { OrderRepository } from '../../domain/repositories/order-repository';
import { UpdateOrderStatusDTO } from '../../application/use-cases/order-use-cases/update-order-status-dto';

export class OrderRepositoryImpl implements OrderRepository {
  private includeQuery = {
    orderPizzaFlavor: {
      include: {
        flavor: {
          select: {
            id: true,
            flavor: true,
            price: true,
          },
        },
      },
    },
    orderPizzaTopping: {
      include: {
        topping: {
          select: {
            id: true,
            topping: true,
            price: true,
          },
        },
      },
    },
  };

  constructor(private prisma: PrismaClient) {}

  async create(order: Order): Promise<void> {
    try {
      await this.prisma.order.create({
        data: {
          ...order,
          orderPizzaFlavor: undefined,
          orderPizzaTopping: undefined,
        },
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
        include: this.includeQuery,
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
        orderBy: {
          created_at: 'desc',
        },
        include: this.includeQuery,
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
        include: this.includeQuery,
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
