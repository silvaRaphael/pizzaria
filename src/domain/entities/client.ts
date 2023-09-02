import { randomUUID } from 'node:crypto';

import { DateTime } from '../../interfaces/utils/datetime';

export class Client {
  public id: string;
  public name: string;
  public phone: string;
  public zip_code: string;
  public street_address: string;
  public street_number: string;
  public reference?: string;
  public state_id: string;
  public city_id: string;
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
    phone: string;
    zip_code: string;
    street_address: string;
    street_number: string;
    reference?: string;
    state_id: string;
    city_id: string;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.phone = phone;
    this.zip_code = zip_code;
    this.street_address = street_address;
    this.street_number = street_number;
    this.reference = reference;
    this.state_id = state_id;
    this.city_id = city_id;
    this.active = active ?? true;
    this.created_at = created_at ?? DateTime();
    this.updated_at = DateTime();
  }
}
