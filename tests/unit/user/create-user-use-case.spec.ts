import { User } from '../../../src/domain/user';
import { UserRepositoryImpl } from '../../../src/infra/database/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../../src/application/use-cases/user-use-cases/create-user-use-case';
import { CreateUserDTO } from '../../../src/application/use-cases/user-use-cases/create-user-dto';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let userData: CreateUserDTO;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    userRepository = new UserRepositoryImpl();
    createUserUseCase = new CreateUserUseCase(userRepository);
    userData = {
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    };
  });

  afterAll(async () => await ClearDatabaseTests(prisma.user, idsToDelete));

  it('Should create a new user', async () => {
    const user = await createUserUseCase.execute(userData);

    idsToDelete.push(user.id);

    expect(user).toBeInstanceOf(User);
  });

  it('Should not create a user with same username', async () => {
    try {
      const user = await createUserUseCase.execute(userData);

      idsToDelete.push(user.id);
    } catch (error: any) {
      expect(error.message).toBe('Usuário já existe!');
    }
  });
});
