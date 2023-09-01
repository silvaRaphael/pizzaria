import { PrismaClient } from '@prisma/client';

import { User } from '../../src/domain/entities/user';
import { UserRepositoryImpl } from '../../src/infrastructure/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { GetUserUseCase } from '../../src/application/use-cases/user-use-cases/get-user-use-case';
import { GetAllUsersUseCase } from '../../src/application/use-cases/user-use-cases/get-all-users-use-case';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let user: User;

  beforeAll(async () => {
    userRepository = new UserRepositoryImpl(new PrismaClient());
    createUserUseCase = new CreateUserUseCase(userRepository);
    getUserUseCase = new GetUserUseCase(userRepository);
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    user = await createUserUseCase.execute({
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    });
  });

  it('Should get a user by id', async () => {
    const response = await getUserUseCase.execute(user.id);

    expect(response).toHaveProperty('id');
  });

  it('Should get all users', async () => {
    const response = await getAllUsersUseCase.execute();

    expect(response.length).toBeGreaterThan(0);
    expect(response[response.length - 1]).toHaveProperty('id');
  });
});
