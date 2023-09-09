import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';
import { prisma } from '../../../src/infra/database/prisma';
import { UserRepositoryImpl } from '../../../src/infra/database/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../../src/application/use-cases/user-use-cases/create-user-use-case';
import { User } from '../../../src/domain/user';
import { DeleteUserUseCase } from '../../../src/application/use-cases/user-use-cases/delete-user-use-case';

describe('Delete User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let user: User;
  let idsToDelete: string[] = [];

  beforeAll(async () => {
    userRepository = new UserRepositoryImpl();
    createUserUseCase = new CreateUserUseCase(userRepository);
    deleteUserUseCase = new DeleteUserUseCase(userRepository);
    user = await createUserUseCase.execute({
      name: 'Test',
      username: 'test01',
      password: '123456',
    });
    idsToDelete.push(user.id);
  });

  afterAll(async () => await ClearDatabaseTests(prisma.user, idsToDelete));

  it('Should delete user', async () => {
    await expect(async () => {
      await deleteUserUseCase.execute(user.id);
    }).not.toThrow();
  });

  it('Should not delete user with wrong ID', async () => {
    await expect(async () => {
      await deleteUserUseCase.execute(user.id + 1);
    }).rejects.toThrowError();
  });
});
