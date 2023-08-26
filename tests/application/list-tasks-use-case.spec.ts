import { PrismaClient } from '@prisma/client';

import TaskRepositoryImpl from '../../src/infrastructure/repositories/task-repository-impl';
import ListTasksUseCase from '../../src/application/use-cases/task-use-cases/list-tasks-use-case';

describe('List Tasks UseCase', () => {
  let prismaClient: PrismaClient;
  let taskRepositoryImpl: TaskRepositoryImpl;
  let listTasksUseCase: ListTasksUseCase;

  beforeAll(() => {
    prismaClient = new PrismaClient();
    taskRepositoryImpl = new TaskRepositoryImpl(prismaClient);
    listTasksUseCase = new ListTasksUseCase(taskRepositoryImpl);
  });

  it('Should list all tasks', async () => {
    const tasks = await listTasksUseCase.execute();

    expect(tasks).toBeInstanceOf(Array);
    expect(tasks[0]).toHaveProperty('id');
  });
});
