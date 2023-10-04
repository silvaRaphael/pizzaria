import { randomUUID } from 'crypto';

import { DateTime } from '../infra/http/utils/datetime';

export class OrderPizza {
	public id: string;
	public order_id: string;
	public size: 0 | 1 | 2;
	public price: number;
	public ammount: number;
	public status: number;
	public done: boolean;
	public active: boolean;
	public created_at: Date;
	public updated_at: Date;

	constructor({
		id,
		order_id,
		size,
		price,
		status,
		ammount,
		done,
		active,
		created_at,
	}: {
		id?: string;
		order_id: string;
		size: 0 | 1 | 2;
		price: number;
		status?: number;
		ammount?: number;
		done?: boolean;
		active?: boolean;
		created_at?: Date;
	}) {
		this.id = id ?? randomUUID();
		this.order_id = order_id;
		this.size = size;
		this.price = price;
		this.status = status ?? 0;
		this.ammount = ammount || 1;
		this.done = done ?? false;
		this.active = active ?? true;
		this.created_at = created_at ?? DateTime();
		this.updated_at = DateTime();
	}
}
