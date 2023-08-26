import Task from '../entities/task';

interface TaskRepository {
  create(task: Task): void;
  getAll(): Task[];
}

export default TaskRepository;
