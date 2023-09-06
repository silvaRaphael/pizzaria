import { PizzaSizes } from '../../../domain/order';

export interface CreateOrderDTO {
  client_id: string;
  size: PizzaSizes;
  price: number;
  pizzaFlavorsIds: string[];
  pizzaToppingsIds: string[];
}
