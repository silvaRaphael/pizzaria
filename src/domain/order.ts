import { randomUUID } from 'crypto';

import { DateTime } from '../infra/http/utils/datetime';

export class Order {
	public id: string;
	public client_id: string;
	public price: number;
	public status: number;
	public done: boolean;
	public active: boolean;
	public created_at: Date;
	public updated_at: Date;

	constructor({
		id,
		client_id,
		price,
		status,
		done,
		active,
		created_at,
	}: {
		id?: string;
		client_id?: string;
		price: number;
		status?: number;
		done?: boolean;
		active?: boolean;
		created_at?: Date;
	}) {
		this.id = id ?? randomUUID();
		this.client_id = client_id ?? '';
		this.price = price;
		this.status = status ?? 0;
		this.done = done ?? false;
		this.active = active ?? true;
		this.created_at = created_at ?? DateTime();
		this.updated_at = DateTime();
	}
}
