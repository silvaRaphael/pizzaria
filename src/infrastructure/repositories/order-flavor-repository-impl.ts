import { PrismaClient } from '@prisma/client';

import { OrderPizzaFlavorRepository } from '../../domain/repositories/order-pizza-flavor-repository';
import { OrderPizzaFlavor } from '../../domain/entities/order-pizza-flavor';

export class OrderPizzaFlavorImpl implements OrderPizzaFlavorRepository {
  private includeQuery = {
    flavor: {
      select: {
        id: true,
        flavor: true,
        price: true,
      },
    },
  };

  constructor(private prisma: PrismaClient) {}

  async create(orderPizzaFlavor: OrderPizzaFlavor): Promise<OrderPizzaFlavor> {
    try {
      return (await this.prisma.orderPizzaFlavor.create({
        data: { ...orderPizzaFlavor, flavor: undefined },
        include: this.includeQuery,
      })) as OrderPizzaFlavor;
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
        include: this.includeQuery,
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
        include: this.includeQuery,
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
