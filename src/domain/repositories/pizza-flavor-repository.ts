import { PizzaFlavor } from '../entities/pizza-flavor';

export interface PizzaFlavorRepository {
  create(pizzaFlavor: PizzaFlavor): Promise<void>;
  getOne(pizzaFlavorId: string): Promise<PizzaFlavor>;
  getAll(): Promise<PizzaFlavor[]>;
  delete(pizzaFlavorId: string): Promise<void>;
}
