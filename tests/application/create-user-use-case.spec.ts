import { PrismaClient } from '@prisma/client';

import { User } from '../../src/domain/entities/user';
import { UserRepositoryImpl } from '../../src/infrastructure/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { CreateUserUseCaseDTO } from '../../src/application/use-cases/user-use-cases/create-user-dto';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let userData: CreateUserUseCaseDTO;

  beforeAll(() => {
    userRepository = new UserRepositoryImpl(new PrismaClient());
    createUserUseCase = new CreateUserUseCase(userRepository);
    userData = {
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    };
  });

  it('Should create a new user', async () => {
    const response = await createUserUseCase.execute(userData);

    expect(response).toBeInstanceOf(User);
  });

  it('Should not create a user with same username', async () => {
    try {
      await createUserUseCase.execute(userData);
    } catch (error: any) {
      expect(error.message).toBe('Usuário já existe!');
    }
  });
});
