import { User } from '../../domain/user';

export interface UserRepository {
	create(user: User): Promise<void>;
	getOne(userId: string): Promise<User>;
	getAll(): Promise<User[]>;
	update(user: User): Promise<void>;
	delete(userId: string): Promise<void>;
}
