import { PrismaClient } from '@prisma/client';

import TaskRepositoryImpl from '../../src/infrastructure/repositories/task-repository-impl';
import CreateTaskUseCase from '../../src/application/use-cases/task-use-cases/create-task-use-case';

describe('Create Task UseCase', () => {
  let prismaClient: PrismaClient;
  let taskRepositoryImpl: TaskRepositoryImpl;
  let createTaskUseCase: CreateTaskUseCase;

  beforeAll(() => {
    prismaClient = new PrismaClient();
    taskRepositoryImpl = new TaskRepositoryImpl(prismaClient);
    createTaskUseCase = new CreateTaskUseCase(taskRepositoryImpl);
  });

  it('Should create a new task', async () => {
    const task = await createTaskUseCase.execute({ title: 'Test' });

    expect(task).toBeUndefined();
  });
});
