import { CreateOrderDTO } from './create-order-dto';

export interface CreateOrderOutputDTO extends CreateOrderDTO {
  id: string;
  pizzaFlavors: string[];
  pizzaToppings: string[];
}
