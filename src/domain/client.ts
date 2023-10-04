import { randomUUID } from 'crypto';

import { DateTime } from '../infra/http/utils/datetime';

export class Client {
	public id: string;
	public name: string;
	public phone?: string | null;
	public zip_code?: string | null;
	public street_address?: string | null;
	public street_number?: string | null;
	public reference?: string | null;
	public state_id?: string | null;
	public city_id?: string | null;
	public active: boolean;
	public created_at: Date;
	public updated_at: Date;

	constructor({
		id,
		name,
		phone,
		zip_code,
		street_address,
		street_number,
		reference,
		state_id,
		city_id,
		active,
		created_at,
	}: {
		id?: string;
		name: string;
		phone?: string | null;
		zip_code?: string | null;
		street_address?: string | null;
		street_number?: string | null;
		reference?: string | null;
		state_id?: string | null;
		city_id?: string | null;
		active?: boolean;
		created_at?: Date;
	}) {
		this.id = id ?? randomUUID();
		this.name = name;
		this.phone = phone || null;
		this.zip_code = zip_code || null;
		this.street_address = street_address || null;
		this.street_number = street_number || null;
		this.reference = reference || null;
		this.state_id = state_id || null;
		this.city_id = city_id || null;
		this.active = active || true;
		this.created_at = created_at ?? DateTime();
		this.updated_at = DateTime();
	}
}
