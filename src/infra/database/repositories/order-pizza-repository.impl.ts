import { OrderPizzaRepository } from '../../../application/repositories/order-pizza-repository';
import { UpdateOrderStatusDTO } from '../../../application/use-cases/order-use-cases/update-order-status-dto';
import { OrderPizza } from '../../../domain/order-pizza';
import { prisma } from '../prisma';

export class OrderPizzaRepositoryImpl implements OrderPizzaRepository {
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

  async create(orderPizza: OrderPizza): Promise<void> {
    try {
      await prisma.orderPizza.create({
        data: {
          id: orderPizza.id,
          order_id: orderPizza.order_id,
          size: Number(orderPizza.size),
          price: orderPizza.price,
          status: orderPizza.status,
          ammount: orderPizza.ammount,
          done: orderPizza.done,
          active: orderPizza.active,
          created_at: orderPizza.created_at,
          updated_at: orderPizza.updated_at,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(orderPizzaId: string): Promise<OrderPizza> {
    try {
      return (await prisma.orderPizza.findFirst({
        where: {
          active: true,
          done: false,
          id: orderPizzaId,
        },
        include: this.includeQuery,
      })) as OrderPizza;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<OrderPizza[]> {
    try {
      return (await prisma.orderPizza.findMany({
        where: {
          active: true,
          done: false,
        },
        orderBy: {
          updated_at: 'desc',
        },
        include: this.includeQuery,
      })) as any as OrderPizza[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllFromOrder(orderId: string): Promise<OrderPizza[]> {
    try {
      return (await prisma.orderPizza.findMany({
        where: {
          active: true,
          order_id: orderId,
        },
        orderBy: {
          updated_at: 'desc',
        },
        include: {
          ...this.includeQuery,
          order: {
            select: {
              client: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })) as OrderPizza[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(orderPizza: OrderPizza): Promise<void> {
    try {
      await prisma.orderPizza.update({
        where: {
          active: true,
          id: orderPizza.id,
        },
        data: {
          price: orderPizza.price,
          size: Number(orderPizza.size),
          updated_at: orderPizza.updated_at,
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
      await prisma.orderPizza.update({
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

  async delete(orderPizzaId: string): Promise<void> {
    try {
      await prisma.orderPizza.update({
        where: {
          id: orderPizzaId,
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
