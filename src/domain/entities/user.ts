import { randomUUID } from 'node:crypto';
import { hash } from 'bcryptjs';

export class User {
  public id: string;
  public username: string;
  public name: string;
  public password: string;
  public active: boolean;
  public created_at: Date;
  public updated_at: Date;

  constructor({
    id,
    username,
    name,
    password,
    active,
    created_at,
  }: {
    id?: string;
    username: string;
    name: string;
    password: string;
    active?: boolean;
    created_at?: Date;
  }) {
    this.id = id ?? randomUUID();
    this.username = username;
    this.name = name;
    this.password = password;
    this.active = active ?? true;
    this.created_at = created_at ?? new Date();
    this.updated_at = new Date();
  }
}
