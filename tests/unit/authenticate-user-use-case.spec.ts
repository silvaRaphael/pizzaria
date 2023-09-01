import { PrismaClient } from '@prisma/client';

import { User } from '../../src/domain/entities/user';
import { UserRepositoryImpl } from '../../src/infrastructure/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { AuthenticateUserUseCase } from '../../src/application/use-cases/user-use-cases/authenticate-user-use-case';
import { ClearDatabaseTests } from '../../src/interfaces/utils/clear-database-tests';

describe('Authenticate User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let user: User;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    userRepository = new UserRepositoryImpl(new PrismaClient());
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
    user = await createUserUseCase.execute({
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    });
    idsToDelete.push(user.id);
  });

  afterAll(
    async () => await ClearDatabaseTests(new PrismaClient().user, idsToDelete),
  );

  it('Should login with username and password', async () => {
    const response = await authenticateUserUseCase.execute({
      username: user.username,
      password: '123',
    });

    expect(response.token).toBeDefined();
  });
});
