import { OrderPizzaToppingRepository } from '../../../application/repositories/order-pizza-topping-repository';
import { OrderPizzaTopping } from '../../../domain/order-pizza-topping';
import { prisma } from '../prisma';

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

  async create(
    orderPizzaTopping: OrderPizzaTopping,
  ): Promise<OrderPizzaTopping> {
    try {
      return (await prisma.orderPizzaTopping.create({
        data: {
          id: orderPizzaTopping.id,
          order_id: orderPizzaTopping.order_id,
          topping_id: orderPizzaTopping.topping_id,
        },
        include: this.includeQuery,
      })) as OrderPizzaTopping;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(orderPizzaToppingId: string): Promise<OrderPizzaTopping> {
    try {
      return (await prisma.orderPizzaTopping.findFirst({
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
      return (await prisma.orderPizzaTopping.findMany({
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
      await prisma.orderPizzaTopping.delete({
        where: {
          id: orderPizzaToppingId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteByOrderId(orderId: string): Promise<void> {
    try {
      await prisma.orderPizzaTopping.deleteMany({
        where: {
          order_id: orderId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
