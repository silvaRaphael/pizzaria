import { OrderPizzaFlavorRepository } from '../../../application/repositories/order-pizza-flavor-repository';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { prisma } from '../prisma';

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

  async create(orderPizzaFlavor: OrderPizzaFlavor): Promise<OrderPizzaFlavor> {
    try {
      return (await prisma.orderPizzaFlavor.create({
        data: {
          id: orderPizzaFlavor.id,
          order_id: orderPizzaFlavor.order_id,
          flavor_id: orderPizzaFlavor.flavor_id,
        },
        include: this.includeQuery,
      })) as OrderPizzaFlavor;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(orderPizzaFlavor: string): Promise<OrderPizzaFlavor> {
    try {
      return (await prisma.orderPizzaFlavor.findFirst({
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
      return (await prisma.orderPizzaFlavor.findMany({
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
      await prisma.orderPizzaFlavor.delete({
        where: {
          id: orderPizzaFlavorId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteByOrderId(orderId: string): Promise<void> {
    try {
      await prisma.orderPizzaFlavor.deleteMany({
        where: {
          order_id: orderId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
