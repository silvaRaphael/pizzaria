import { randomUUID } from 'node:crypto';

import { OrderPizzaFlavor } from './order-pizza-flavor';
import { OrderPizzaTopping } from './order-pizza-topping';
import { DateTime } from '../infra/http/utils/datetime';

export class Order {
  public id: string;
  public client_id: string;
  public size: 0 | 1 | 2;
  public price: number;
  public status: number;
  public done: boolean;
  public active: boolean;
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
    active,
    created_at,
  }: {
    id?: string;
    client_id: string;
    size: 0 | 1 | 2;
    price: number;
    status?: number;
    done?: boolean;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.client_id = client_id;
    this.size = size;
    this.price = price;
    this.status = status ?? 0;
    this.done = done ?? false;
    this.active = active ?? true;
    this.created_at = created_at ?? DateTime();
    this.updated_at = DateTime();
  }
}
