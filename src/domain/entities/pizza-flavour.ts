import { randomUUID } from 'node:crypto';

export class PizzaFlavour {
  public id: string;
  public flavor: string;
  public price: number;
  public active: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor({
    id,
    flavor,
    price,
    active,
    created_at,
  }: {
    id?: string;
    flavor: string;
    price: number;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.flavor = flavor;
    this.price = price;
    this.active = active ?? true;
    this.created_at = created_at ?? new Date();
    this.updated_at = new Date();
  }
}
