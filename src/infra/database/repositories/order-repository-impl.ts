import { OrderRepository } from '../../../application/repositories/order-repository';
import { UpdateOrderStatusDTO } from '../../../application/use-cases/order-use-cases/update-order-status-dto';
import { Order } from '../../../domain/order';
import { prisma } from '../prisma';

export class OrderRepositoryImpl implements OrderRepository {
  async create(order: Order): Promise<void> {
    try {
      await prisma.order.create({
        data: {
          id: order.id,
          client_id: order.client_id,
          price: order.price,
          status: order.status,
          done: order.done,
          active: order.active,
          created_at: order.created_at,
          updated_at: order.updated_at,
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
          active: true,
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
      return (await prisma.order.findMany({
        where: {
          active: true,
          done: false,
        },
        orderBy: {
          updated_at: 'desc',
        },
        include: {
          orderPizza: {
            select: {
              ammount: true,
            },
          },
          client: {
            select: {
              name: true,
            },
          },
        },
      })) as any as Order[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllFromClient(clientId: string): Promise<Order[]> {
    try {
      return (await prisma.order.findMany({
        where: {
          active: true,
          client_id: clientId,
        },
        orderBy: {
          updated_at: 'desc',
        },
        include: {
          orderPizza: {
            select: {
              ammount: true,
            },
          },
        },
      })) as Order[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(order: Order): Promise<void> {
    try {
      await prisma.order.update({
        where: {
          active: true,
          id: order.id,
        },
        data: {
          price: order.price,
          updated_at: order.updated_at,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateStatus({
    id,
    status,
    done,
  }: UpdateOrderStatusDTO): Promise<void> {
    try {
      await prisma.order.update({
        data: {
          status,
          done,
        },
        where: {
          id: id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(orderId: string): Promise<void> {
    try {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          active: false,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
