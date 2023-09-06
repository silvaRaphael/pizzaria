import { PizzaFlavor } from '../../domain/pizza-flavor';

export interface PizzaFlavorRepository {
  create(pizzaFlavor: PizzaFlavor): Promise<void>;
  getOne(pizzaFlavorId: string): Promise<PizzaFlavor>;
  getAll(): Promise<PizzaFlavor[]>;
  update(pizzaFlavor: PizzaFlavor): Promise<void>;
  delete(pizzaFlavorId: string): Promise<void>;
}
