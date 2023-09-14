import { OrderPizzaFlavorRepository } from '../../../application/repositories/order-pizza-flavor-repository';
import { OrderPizzaFlavor } from '../../../domain/order-pizza-flavor';
import { prisma } from '../prisma';

export class OrderPizzaFlavorRepositoryImpl
  implements OrderPizzaFlavorRepository
{
  private includeQuery = {
    flavor: {
      select: {
        id: true,
        flavor: true,
        price: true,
      },
    },
  };

  async create(orderPizzaFlavor: OrderPizzaFlavor): Promise<void> {
    try {
      await prisma.orderPizzaFlavor.create({
        data: {
          id: orderPizzaFlavor.id,
          order_pizza_id: orderPizzaFlavor.order_pizza_id,
          flavor_id: orderPizzaFlavor.flavor_id,
        },
      });
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
          order_pizza_id: orderId,
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
          order_pizza_id: orderId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
