import Task from '../../domain/entities/task';
import TaskRepository from '../../domain/repositories/task-repository';

class TaskRepositoryImpl implements TaskRepository {
  private tasks: Task[] = [];

  create(task: Task): void {
    this.tasks.push(task);
  }

  getAll(): Task[] {
    return this.tasks;
  }
}

export default TaskRepositoryImpl;
