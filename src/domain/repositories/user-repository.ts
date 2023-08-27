import { User } from '../entities/user';

export interface UserRepository {
  create(user: User): Promise<void>;
  getOne(userId: string): Promise<User>;
  getAll(): Promise<User[]>;
}
