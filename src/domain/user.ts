import { randomUUID } from 'node:crypto';
import { hashSync } from 'bcryptjs';

import { DateTime } from '../infra/http/utils/datetime';

export class User {
  public id: string;
  public username: string;
  public name: string;
  public password: string;
  public active: boolean;
  public token?: string;
  public token_expiration?: Date;
  public created_at: Date;
  public updated_at: Date;

  constructor({
    id,
    username,
    name,
    password,
    token,
    token_expiration,
    active,
    created_at,
  }: {
    id?: string;
    username: string;
    name: string;
    password: string;
    token?: string;
    token_expiration?: Date;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.username = username;
    this.name = name;
    this.password = hashSync(password, 8);
    this.token = token;
    this.token_expiration = token_expiration;
    this.active = active ?? true;
    this.created_at = created_at ?? DateTime();
    this.updated_at = DateTime();
  }
}
