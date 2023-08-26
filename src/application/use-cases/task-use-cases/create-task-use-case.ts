import Task from '../../../domain/entities/task';
import TaskRepositoryImpl from '../../../infrastructure/repositories/task-repository-impl';
import CreateTaskUseCaseDTO from './create-task-dto';

class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  async execute({ title }: CreateTaskUseCaseDTO): Promise<void> {
    const task = new Task({
      title,
    });
    await this.taskRepository.create(task);
  }
}

export default CreateTaskUseCase;
