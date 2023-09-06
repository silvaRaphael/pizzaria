import { PizzaFlavorRepository } from '../../../application/repositories/pizza-flavor-repository';
import { PizzaFlavor } from '../../../domain/pizza-flavor';
import { prisma } from '../prisma';

export class PizzaFlavorRepositoryImpl implements PizzaFlavorRepository {
  async create(pizzaFlavor: PizzaFlavor): Promise<void> {
    try {
      await prisma.pizzaFlavor.create({
        data: pizzaFlavor,
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
          created_at: 'desc',
        },
      })) as PizzaFlavor[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(pizzaFlavor: PizzaFlavor): Promise<void> {
    try {
      await prisma.pizzaFlavor.update({
        data: pizzaFlavor,
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
      await prisma.pizzaFlavor.delete({
        where: {
          id: pizzaFlavorId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}