import { randomUUID } from 'node:crypto';

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
    this.created_at = created_at ?? new Date();
    this.updated_at = new Date();
  }
}
