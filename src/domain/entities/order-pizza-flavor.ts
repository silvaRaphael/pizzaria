import { randomUUID } from 'node:crypto';

export class OrderPizzaFlavor {
  public id: string;
  public order_id: string;
  public flavor_id: string;

  constructor({
    id,
    order_id,
    flavor_id,
  }: {
    id?: string;
    order_id: string;
    flavor_id: string;
  }) {
    this.id = id || randomUUID();
    this.order_id = order_id;
    this.flavor_id = flavor_id;
  }
}
