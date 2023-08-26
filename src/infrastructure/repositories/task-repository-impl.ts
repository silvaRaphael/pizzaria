import { PrismaClient } from '@prisma/client';

import Task from '../../domain/entities/task';
import TaskRepository from '../../domain/repositories/task-repository';

class TaskRepositoryImpl implements TaskRepository {
  constructor(private prisma: PrismaClient) {}

  async create(task: Task): Promise<void> {
    await this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        completed: task.completed,
      },
    });
  }

  async getAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }
}

export default TaskRepositoryImpl;
