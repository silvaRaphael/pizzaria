import { User } from '../../src/domain/user';
import { UserRepositoryImpl } from '../../src/infra/database/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { AuthenticateUserUseCase } from '../../src/application/use-cases/user-use-cases/authenticate-user-use-case';
import { ClearDatabaseTests } from '../../src/infra/http/utils/clear-database-tests';

describe('Authenticate User', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let user: User;

  beforeAll(async () => {
    userRepository = new UserRepositoryImpl();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);

    user = await createUserUseCase.execute({
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    });
  });

  it('Should login with username and password', async () => {
    const response = await authenticateUserUseCase.execute({
      username: user.username,
      password: '123',
    });

    expect(response.token).toBeDefined();
  });
});
