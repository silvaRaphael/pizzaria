import { User } from '../../domain/user';
import { AuthenticateUserDTO } from '../use-cases/user-use-cases/authenticate-user-dto';
import { UserCredentialsDTO } from '../use-cases/user-use-cases/user-credentials-dto';

export interface UserRepository {
  create(user: User): Promise<void>;
  getOne(userId: string): Promise<User>;
  getAll(): Promise<User[]>;
  authenticateUser(
    credentials: AuthenticateUserDTO,
  ): Promise<UserCredentialsDTO>;
  validateToken(token: string): Promise<{ userId: string } | null>;
}
