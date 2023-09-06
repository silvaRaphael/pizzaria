import { randomUUID } from 'node:crypto';

import { DateTime } from '../infra/http/utils/datetime';

export class PizzaTopping {
  public id: string;
  public topping: string;
  public price: number;
  public active: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor({
    id,
    topping,
    price,
    active,
    created_at,
  }: {
    id?: string;
    topping: string;
    price: number;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.topping = topping;
    this.price = price;
    this.active = active ?? true;
    this.created_at = created_at ?? DateTime();
    this.updated_at = DateTime();
  }
}
