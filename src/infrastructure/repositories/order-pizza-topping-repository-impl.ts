import { PrismaClient } from '@prisma/client';

import { OrderPizzaToppingRepository } from '../../domain/repositories/order-pizza-topping-repository';
import { OrderPizzaTopping } from '../../domain/entities/order-pizza-topping';

export class OrderPizzaToppingImpl implements OrderPizzaToppingRepository {
  private includeQuery = {
    topping: {
      select: {
        id: true,
        topping: true,
        price: true,
      },
    },
  };

  constructor(private prisma: PrismaClient) {}

  async create(
    orderPizzaTopping: OrderPizzaTopping,
  ): Promise<OrderPizzaTopping> {
    try {
      return (await this.prisma.orderPizzaTopping.create({
        data: { ...orderPizzaTopping, topping: undefined },
        include: this.includeQuery,
      })) as OrderPizzaTopping;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(orderPizzaToppingId: string): Promise<OrderPizzaTopping> {
    try {
      return (await this.prisma.orderPizzaTopping.findFirst({
        where: {
          id: orderPizzaToppingId,
        },
        include: this.includeQuery,
      })) as OrderPizzaTopping;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(orderId: string): Promise<OrderPizzaTopping[]> {
    try {
      return (await this.prisma.orderPizzaTopping.findMany({
        where: {
          order_id: orderId,
        },
        include: this.includeQuery,
      })) as OrderPizzaTopping[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(orderPizzaToppingId: string): Promise<void> {
    try {
      await this.prisma.orderPizzaTopping.delete({
        where: {
          id: orderPizzaToppingId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
