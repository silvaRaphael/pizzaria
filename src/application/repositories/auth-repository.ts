import { AuthenticateUserDTO } from '../use-cases/auth-use-cases/authenticate-user-dto';
import { UserCredentialsDTO } from '../use-cases/user-use-cases/user-credentials-dto';

export interface AuthRepository {
	signInWithUsernameAndPassword(
		credentials: AuthenticateUserDTO,
	): Promise<UserCredentialsDTO>;
	logOut(userCredentials: UserCredentialsDTO): Promise<void>;
	validateToken(token: string): Promise<{ userId: string } | null>;
}
