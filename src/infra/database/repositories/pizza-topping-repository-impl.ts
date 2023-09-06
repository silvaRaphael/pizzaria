import { PizzaToppingRepository } from '../../../application/repositories/pizza-topping-repository';
import { PizzaTopping } from '../../../domain/pizza-topping';
import { prisma } from '../prisma';

export class PizzaToppingRepositoryImpl implements PizzaToppingRepository {
  async create(pizzaTopping: PizzaTopping): Promise<void> {
    try {
      await prisma.pizzaTopping.create({
        data: pizzaTopping,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOne(pizzaToppingId: string): Promise<PizzaTopping> {
    try {
      return (await prisma.pizzaTopping.findFirst({
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
      return (await prisma.pizzaTopping.findMany({
        where: {
          active: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      })) as PizzaTopping[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(pizzaTopping: PizzaTopping): Promise<void> {
    try {
      await prisma.pizzaTopping.update({
        data: pizzaTopping,
        where: {
          id: pizzaTopping.id,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(pizzaToppingId: string): Promise<void> {
    try {
      await prisma.pizzaTopping.delete({
        where: {
          id: pizzaToppingId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
