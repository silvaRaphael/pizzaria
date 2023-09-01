import { randomUUID } from 'node:crypto';

import { PizzaFlavour } from './pizza-flavour';
import { PizzaTopping } from './pizza-topping';

enum PizzaSizes {
  small,
  medium,
  large,
}

export class Pizza {
  public id: string;
  public name: string;
  public size: PizzaSizes;
  public flavor: PizzaFlavour[];
  public toppings: PizzaTopping[];
  public price: number;
  public active: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor({
    id,
    name,
    size,
    flavor,
    toppings,
    price,
    active,
    created_at,
  }: {
    id?: string;
    name: string;
    size: PizzaSizes;
    flavor: PizzaFlavour[];
    toppings: PizzaTopping[];
    price: number;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.size = size;
    this.flavor = flavor;
    this.toppings = toppings;
    this.price = price;
    this.active = active ?? true;
    this.created_at = created_at ?? new Date();
    this.updated_at = new Date();
  }
}
