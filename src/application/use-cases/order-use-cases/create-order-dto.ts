export interface CreateOrderDTO {
  client_id: string;
  size: 0 | 1 | 2;
  price: number;
  pizzaFlavorsIds: string[];
  pizzaToppingsIds: string[];
}
