import { PizzaFlavorRepository } from '../../../application/repositories/pizza-flavor-repository';
import { PizzaFlavor } from '../../../domain/pizza-flavor';
import { prisma } from '../prisma';

export class PizzaFlavorRepositoryImpl implements PizzaFlavorRepository {
  async create(pizzaFlavor: PizzaFlavor): Promise<void> {
    try {
      await prisma.pizzaFlavor.create({
        data: {
          id: pizzaFlavor.id,
          flavor: pizzaFlavor.flavor,
          price: pizzaFlavor.price,
          active: pizzaFlavor.active,
          created_at: pizzaFlavor.created_at,
          updated_at: pizzaFlavor.updated_at,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(pizzaFlavorId: string): Promise<PizzaFlavor> {
    try {
      return (await prisma.pizzaFlavor.findFirst({
        where: {
          active: true,
          id: pizzaFlavorId,
        },
        select: {
          id: true,
          flavor: true,
          price: true,
        },
      })) as PizzaFlavor;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<PizzaFlavor[]> {
    try {
      return (await prisma.pizzaFlavor.findMany({
        where: {
          active: true,
        },
        orderBy: {
          updated_at: 'desc',
        },
        select: {
          id: true,
          flavor: true,
          price: true,
        },
      })) as PizzaFlavor[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(pizzaFlavor: PizzaFlavor): Promise<void> {
    try {
      await prisma.pizzaFlavor.update({
        data: {
          flavor: pizzaFlavor.flavor,
          price: pizzaFlavor.price,
          updated_at: pizzaFlavor.updated_at,
        },
        where: {
          id: pizzaFlavor.id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(pizzaFlavorId: string): Promise<void> {
    try {
      await prisma.pizzaFlavor.update({
        data: {
          active: false,
        },
        where: {
          id: pizzaFlavorId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
