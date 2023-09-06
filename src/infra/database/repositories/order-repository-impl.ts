import { OrderRepository } from '../../../application/repositories/order-repository';
import { UpdateOrderStatusDTO } from '../../../application/use-cases/order-use-cases/update-order-status-dto';
import { Order } from '../../../domain/order';
import { prisma } from '../prisma';

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

  async create(order: Order): Promise<void> {
    try {
      await prisma.order.create({
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
      return (await prisma.order.findFirst({
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
      return (await prisma.order.findMany({
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
      return (await prisma.order.findMany({
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
      await prisma.order.update({
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
      await prisma.order.delete({
        where: {
          id: orderId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
