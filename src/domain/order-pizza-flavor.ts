import { randomUUID } from 'crypto';

import { PizzaFlavor } from './pizza-flavor';

export class OrderPizzaFlavor {
	public id: string;
	public order_pizza_id: string;
	public flavor_id: string;
	public flavor?: PizzaFlavor;

	constructor({
		id,
		order_pizza_id,
		flavor_id,
	}: {
		id?: string;
		order_pizza_id: string;
		flavor_id: string;
	}) {
		this.id = id || randomUUID();
		this.order_pizza_id = order_pizza_id;
		this.flavor_id = flavor_id;
	}
}
