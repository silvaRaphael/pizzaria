import Task from '../entities/task';

interface TaskRepository {
  create(task: Task): Promise<void>;
  getAll(): Promise<Task[]>;
}

export default TaskRepository;
