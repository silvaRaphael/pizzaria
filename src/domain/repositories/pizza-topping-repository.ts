import { PizzaTopping } from '../entities/pizza-topping';

export interface PizzaToppingRepository {
  create(pizzaTopping: PizzaTopping): Promise<void>;
  getOne(pizzaToppingId: string): Promise<PizzaTopping>;
  getAll(): Promise<PizzaTopping[]>;
  delete(pizzaToppingId: string): Promise<void>;
}
