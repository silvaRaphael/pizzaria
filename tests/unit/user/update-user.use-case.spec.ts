import { CreateUserUseCase } from '../../../src/application/use-cases/user-use-cases/create-user-use-case';
import { UpdateUserUseCase } from '../../../src/application/use-cases/user-use-cases/update-user-use-case';
import { User } from '../../../src/domain/user';
import { prisma } from '../../../src/infra/database/prisma';
import { UserRepositoryImpl } from '../../../src/infra/database/repositories/user-repository-impl';
import { ClearDatabaseTests } from '../../../src/infra/http/utils/clear-database-tests';

describe('Update User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let idsToDelete: string[] = [];
  let user: User;

  beforeAll(async () => {
    userRepository = new UserRepositoryImpl();
    createUserUseCase = new CreateUserUseCase(userRepository);
    updateUserUseCase = new UpdateUserUseCase(userRepository);
    user = await createUserUseCase.execute({
      name: 'Test',
      username: 'test01',
      password: '123456',
    });
    idsToDelete.push(user.id);
  });

  afterAll(async () => await ClearDatabaseTests(prisma.user, idsToDelete));

  it('Should create a new user', async () => {
    const reponse = await updateUserUseCase.execute({
      id: user.id,
      name: 'Test 2',
      username: 'test02',
      password: '123123',
    });

    expect(reponse).toBeInstanceOf(User);
    expect(reponse.name).toBe('Test 2');
    expect(reponse.username).toBe('test02');
  });
});
