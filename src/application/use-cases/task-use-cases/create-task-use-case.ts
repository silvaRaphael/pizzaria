import Task from '../../../domain/entities/task';
import TaskRepositoryImpl from '../../../infrastructure/repositories/task-repository-impl';
import CreateTaskUseCaseDTO from './create-task-dto';

class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  async execute({ title }: CreateTaskUseCaseDTO): Promise<Task> {
    try {
      if (!title) {
        throw new Error('Dados faltando!');
      }
      const task = new Task({
        title,
      });
      await this.taskRepository.create(task);
      return task;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default CreateTaskUseCase;
