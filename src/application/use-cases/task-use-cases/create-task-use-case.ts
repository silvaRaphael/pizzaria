import Task from '../../../domain/entities/task';
import TaskRepositoryImpl from '../../../infrastructure/repositories/task-repository-impl';

class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepositoryImpl) {}

  execute(title: string): void {
    const task = new Task(Date.now(), title, false);
    this.taskRepository.create(task);
  }
}

export default CreateTaskUseCase;
