import { PrismaClient } from '@prisma/client';

import { UserRepositoryImpl } from '../../src/infrastructure/repositories/user-repository-impl';
import { User } from '../../src/domain/entities/user';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  beforeAll(() => {
    userRepository = new UserRepositoryImpl(new PrismaClient());
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('Should create a new user', async () => {
    const response = await createUserUseCase.execute({
      username: 'test' + new Date(),
      name: 'test',
      password: '123',
    });

    expect(response).toBeInstanceOf(User);
  });
});
