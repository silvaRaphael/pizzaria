import { randomUUID } from 'node:crypto';
import { OrderPizzaFlavor } from './order-pizza-flavor';
import { OrderPizzaTopping } from './order-pizza-topping';

export enum PizzaSizes {
  small = 0,
  medium = 1,
  large = 2,
}

export class Order {
  public id: string;
  public client_id: string;
  public size: PizzaSizes;
  public price: number;
  public status: number;
  public done: boolean;
  public created_at: Date;
  public updated_at: Date;
  public orderPizzaFlavor: OrderPizzaFlavor[] = [];
  public orderPizzaTopping: OrderPizzaTopping[] = [];

  constructor({
    id,
    client_id,
    size,
    price,
    status,
    done,
    created_at,
  }: {
    id?: string;
    client_id: string;
    size: PizzaSizes;
    price: number;
    status?: number;
    done?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.client_id = client_id;
    this.size = size;
    this.price = price;
    this.status = status ?? 0;
    this.done = done ?? false;
    this.created_at = created_at ?? new Date();
    this.updated_at = new Date();
  }
}
