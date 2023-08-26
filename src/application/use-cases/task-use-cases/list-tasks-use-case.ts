import Task from '../../../domain/entities/task';
import TaskRepositoryImpl from '../../../infrastructure/repositories/task-repository-impl';

class ListTasksUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.getAll();
  }
}

export default ListTasksUseCase;
