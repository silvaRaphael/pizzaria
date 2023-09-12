interface CreateOrderPizzaDTO {
  size: 0 | 1 | 2;
  price: number;
  ammount: number;
  pizzaFlavorsIds: string[];
  pizzaToppingsIds: string[];
}

export interface CreateOrderDTO {
  client_id: string;
  price: number;
  orderPizzas: CreateOrderPizzaDTO[];
}
