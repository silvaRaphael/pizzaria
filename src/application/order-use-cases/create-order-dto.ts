import { PizzaSizes } from '../../domain/entities/order';

export interface CreateOrderDTO {
  client_id: string;
  size: PizzaSizes;
  price: number;
  pizzaFlavors: string[];
  pizzaToppings: string[];
}
