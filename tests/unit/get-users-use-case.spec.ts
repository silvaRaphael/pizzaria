import { UserRepositoryImpl } from '../../src/infra/database/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { GetUserUseCase } from '../../src/application/use-cases/user-use-cases/get-user-use-case';
import { GetAllUsersUseCase } from '../../src/application/use-cases/user-use-cases/get-all-users-use-case';
import { User } from '../../src/domain/user';
import { ClearDatabaseTests } from '../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../src/infra/database/prisma';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let user: User;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    userRepository = new UserRepositoryImpl();
    createUserUseCase = new CreateUserUseCase(userRepository);
    getUserUseCase = new GetUserUseCase(userRepository);
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    user = await createUserUseCase.execute({
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    });
    idsToDelete.push(user.id);
  });

  afterAll(async () => await ClearDatabaseTests(prisma.user, idsToDelete));

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
