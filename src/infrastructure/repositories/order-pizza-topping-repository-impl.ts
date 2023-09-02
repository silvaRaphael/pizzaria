import { PrismaClient } from '@prisma/client';

import { OrderPizzaToppingRepository } from '../../domain/repositories/order-pizza-topping-repository';
import { OrderPizzaTopping } from '../../domain/entities/order-pizza-topping';

export class OrderPizzaToppingImpl implements OrderPizzaToppingRepository {
  constructor(private prisma: PrismaClient) {}

  async create(OrderPizzaTopping: OrderPizzaTopping): Promise<void> {
    try {
      await this.prisma.orderPizzaTopping.create({
        data: OrderPizzaTopping,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(OrderPizzaToppingId: string): Promise<OrderPizzaTopping> {
    try {
      return (await this.prisma.orderPizzaTopping.findFirst({
        where: {
          id: OrderPizzaToppingId,
        },
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
      })) as OrderPizzaTopping[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(OrderPizzaToppingId: string): Promise<void> {
    try {
      await this.prisma.orderPizzaTopping.delete({
        where: {
          id: OrderPizzaToppingId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
