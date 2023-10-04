import { User } from '../../src/domain/user';
import { UserRepositoryImpl } from '../../src/infra/database/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { SignInUseCase } from '../../src/application/use-cases/auth-use-cases/sign-in-use-case';
import { AuthRepositoryImpl } from '../../src/infra/database/repositories/auth-repository-impl';

describe('Authenticate User', () => {
	let userRepository: UserRepositoryImpl;
	let authRepository: AuthRepositoryImpl;
	let createUserUseCase: CreateUserUseCase;
	let signInUseCase: SignInUseCase;
	let user: User;

	beforeAll(async () => {
		userRepository = new UserRepositoryImpl();
		authRepository = new AuthRepositoryImpl();
		signInUseCase = new SignInUseCase(authRepository);
		createUserUseCase = new CreateUserUseCase(userRepository);

		user = await createUserUseCase.execute({
			username: 'test' + new Date().getTime(),
			name: 'test',
			password: '123',
		});
	});

	it('Should login with username and password', async () => {
		const response = await signInUseCase.execute({
			username: user.username,
			password: '123',
		});

		expect(response.token).toBeDefined();
	});
});
