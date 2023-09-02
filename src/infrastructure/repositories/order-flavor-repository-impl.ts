import { PrismaClient } from '@prisma/client';

import { OrderPizzaFlavorRepository } from '../../domain/repositories/order-pizza-flavor-repository';
import { OrderPizzaFlavor } from '../../domain/entities/order-pizza-flavor';

export class OrderPizzaFlavorImpl implements OrderPizzaFlavorRepository {
  constructor(private prisma: PrismaClient) {}

  async create(orderPizzaFlavor: OrderPizzaFlavor): Promise<void> {
    try {
      await this.prisma.orderPizzaFlavor.create({
        data: orderPizzaFlavor,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(orderPizzaFlavor: string): Promise<OrderPizzaFlavor> {
    try {
      return (await this.prisma.orderPizzaFlavor.findFirst({
        where: {
          id: orderPizzaFlavor,
        },
      })) as OrderPizzaFlavor;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(orderId: string): Promise<OrderPizzaFlavor[]> {
    try {
      return (await this.prisma.orderPizzaFlavor.findMany({
        where: {
          order_id: orderId,
        },
      })) as OrderPizzaFlavor[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(orderPizzaFlavorId: string): Promise<void> {
    try {
      await this.prisma.orderPizzaFlavor.delete({
        where: {
          id: orderPizzaFlavorId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
