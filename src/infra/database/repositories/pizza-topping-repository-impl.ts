import { PizzaToppingRepository } from '../../../application/repositories/pizza-topping-repository';
import { PizzaTopping } from '../../../domain/pizza-topping';
import { prisma } from '../prisma';

export class PizzaToppingRepositoryImpl implements PizzaToppingRepository {
  async create(pizzaTopping: PizzaTopping): Promise<void> {
    try {
      await prisma.pizzaTopping.create({
        data: {
          id: pizzaTopping.id,
          topping: pizzaTopping.topping,
          price: pizzaTopping.price,
          active: pizzaTopping.active,
          created_at: pizzaTopping.created_at,
          updated_at: pizzaTopping.updated_at,
        },
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
        select: {
          id: true,
          topping: true,
          price: true,
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
          updated_at: 'desc',
        },
        select: {
          id: true,
          topping: true,
          price: true,
        },
      })) as PizzaTopping[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(pizzaTopping: PizzaTopping): Promise<void> {
    try {
      await prisma.pizzaTopping.update({
        data: {
          topping: pizzaTopping.topping,
          price: pizzaTopping.price,
          updated_at: pizzaTopping.updated_at,
        },
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
      await prisma.pizzaTopping.update({
        data: {
          active: false,
        },
        where: {
          id: pizzaToppingId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
