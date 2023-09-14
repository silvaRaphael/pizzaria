import { User } from '../../src/domain/user';
import { UserRepositoryImpl } from '../../src/infra/database/repositories/user-repository-impl';
import { CreateUserUseCase } from '../../src/application/use-cases/user-use-cases/create-user-use-case';
import { GetUserUseCase } from '../../src/application/use-cases/user-use-cases/get-user-use-case';
import { GetAllUsersUseCase } from '../../src/application/use-cases/user-use-cases/get-all-users-use-case';
import { CreateUserDTO } from '../../src/application/use-cases/user-use-cases/create-user-dto';
import { UpdateUserUseCase } from '../../src/application/use-cases/user-use-cases/update-user-use-case';
import { DeleteUserUseCase } from '../../src/application/use-cases/user-use-cases/delete-user-use-case';

describe('Create User UseCase', () => {
  let userRepository: UserRepositoryImpl;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let user: User;
  let userData: CreateUserDTO;

  beforeAll(() => {
    userRepository = new UserRepositoryImpl();
    createUserUseCase = new CreateUserUseCase(userRepository);
    getUserUseCase = new GetUserUseCase(userRepository);
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
    updateUserUseCase = new UpdateUserUseCase(userRepository);
    deleteUserUseCase = new DeleteUserUseCase(userRepository);

    userData = {
      username: 'test' + new Date().getTime(),
      name: 'test',
      password: '123',
    };
  });

  it('Should create a new user', async () => {
    user = await createUserUseCase.execute(userData);

    expect(user).toBeInstanceOf(User);
  });

  it('Should not create a user with same username', async () => {
    try {
      await createUserUseCase.execute(userData);
    } catch (error: any) {
      expect(error.message).toBe('Usuário já existe!');
    }
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

  it('Should delete user', async () => {
    expect(async () => {
      await deleteUserUseCase.execute(user.id);
    }).not.toThrow();
  });

  it('Should not delete user with wrong ID', async () => {
    await expect(async () => {
      await deleteUserUseCase.execute(user.id + 1);
    }).rejects.toThrowError();
  });
});
