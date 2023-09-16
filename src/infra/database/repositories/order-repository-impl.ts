import { OrderFilterDTO } from '../../../application/repositories/order-filter-dto';
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
          id: orderId,
        },
        include: {
          orderPizza: {
            select: {
              ammount: true,
              orderPizzaFlavor: {
                select: {
                  flavor: {
                    select: {
                      flavor: true,
                    },
                  },
                },
              },
              orderPizzaTopping: {
                select: {
                  topping: {
                    select: {
                      topping: true,
                    },
                  },
                },
              },
            },
          },
          client: {
            select: {
              name: true,
            },
          },
        },
      })) as Order;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(filter?: OrderFilterDTO): Promise<Order[]> {
    let created_at = {};
    if (filter?.created_at) {
      created_at = {
        gte: new Date(filter.created_at.setHours(0, 0, 0, 0)),
        lte: new Date(filter.created_at.setHours(23, 59, 59, 999)),
      };
    }
    if (filter?.created_in && filter.created_in.length) {
      created_at = {
        gte: new Date(filter.created_in[0].setHours(0, 0, 0, 0)),
        lte: new Date(
          filter.created_in[filter.created_in.length - 1].setHours(
            23,
            59,
            59,
            999,
          ),
        ),
      };
    }
    try {
      return (await prisma.order.findMany({
        where: {
          active: true,
          created_at,
        },
        take: filter?.limit,
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
