import { User } from '../entities/user';
import { AuthenticateUserDTO } from '../../application/use-cases/user-use-cases/authenticate-user-dto';
import { UserCredentialsDTO } from '../../application/use-cases/user-use-cases/user-credentials-dto';

export interface UserRepository {
  create(user: User): Promise<void>;
  getOne(userId: string): Promise<User>;
  getAll(): Promise<User[]>;
  authenticateUser(
    credentials: AuthenticateUserDTO,
  ): Promise<UserCredentialsDTO>;
  validateToken(token: string): Promise<{ userId: string } | null>;
}
