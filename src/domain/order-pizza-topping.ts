import { randomUUID } from 'node:crypto';

import { PizzaTopping } from './pizza-topping';

export class OrderPizzaTopping {
  public id?: string;
  public order_id: string;
  public topping_id: string;
  public topping?: PizzaTopping;

  constructor({
    id,
    order_id,
    topping_id,
  }: {
    id?: string;
    order_id: string;
    topping_id: string;
  }) {
    this.id = id || randomUUID();
    this.order_id = order_id;
    this.topping_id = topping_id;
  }
}
