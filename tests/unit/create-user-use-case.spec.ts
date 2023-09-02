import { PrismaClient } from '@prisma/client';

import { User } from '../../src/domain/entities/user';
import { UserRepositoryImpl } from '../../src/infrastructure/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { CreateUserDTO } from '../../src/application/use-cases/user-use-cases/create-user-dto';
import { ClearDatabaseTests } from '../../src/interfaces/utils/clear-database-tests';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let userData: CreateUserDTO;
  let idsToDelete: string[] = [];

  beforeAll(() => {
    userRepository = new UserRepositoryImpl(new PrismaClient());
    createUserUseCase = new CreateUserUseCase(userRepository);
    userData = {
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    };
  });

  afterAll(
    async () => await ClearDatabaseTests(new PrismaClient().user, idsToDelete),
  );

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
