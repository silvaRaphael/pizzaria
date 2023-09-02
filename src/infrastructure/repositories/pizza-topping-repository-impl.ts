import { PrismaClient } from '@prisma/client';

import { PizzaTopping } from '../../domain/entities/pizza-topping';
import { PizzaToppingRepository } from '../../domain/repositories/pizza-topping-repository';

export class PizzaToppingRepositoryImpl implements PizzaToppingRepository {
  constructor(private prisma: PrismaClient) {}

  async create(pizzaTopping: PizzaTopping): Promise<void> {
    try {
      await this.prisma.pizzaTopping.create({
        data: pizzaTopping,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(pizzaToppingId: string): Promise<PizzaTopping> {
    try {
      return (await this.prisma.pizzaTopping.findFirst({
        where: {
          active: true,
          id: pizzaToppingId,
        },
      })) as PizzaTopping;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAll(): Promise<PizzaTopping[]> {
    try {
      return (await this.prisma.pizzaTopping.findMany({
        where: {
          active: true,
        },
      })) as PizzaTopping[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(pizzaToppingId: string): Promise<void> {
    try {
      await this.prisma.pizzaTopping.delete({
        where: {
          id: pizzaToppingId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
