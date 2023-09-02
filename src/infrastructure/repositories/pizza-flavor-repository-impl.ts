import { PrismaClient } from '@prisma/client';

import { PizzaFlavor } from '../../domain/entities/pizza-flavor';
import { PizzaFlavorRepository } from '../../domain/repositories/pizza-flavor-repository';

export class PizzaFlavorRepositoryImpl implements PizzaFlavorRepository {
  constructor(private prisma: PrismaClient) {}

  async create(pizzaFlavor: PizzaFlavor): Promise<void> {
    try {
      await this.prisma.pizzaFlavor.create({
        data: pizzaFlavor,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(pizzaFlavorId: string): Promise<PizzaFlavor> {
    try {
      return (await this.prisma.pizzaFlavor.findFirst({
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
      return (await this.prisma.pizzaFlavor.findMany({
        where: {
          active: true,
        },
      })) as PizzaFlavor[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(pizzaFlavorId: string): Promise<void> {
    try {
      await this.prisma.pizzaFlavor.delete({
        where: {
          id: pizzaFlavorId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
