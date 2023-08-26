import Task from '../entities/task';

interface TaskService {
  createTask(title: string): Promise<Task>;
  getTaskById(id: number): Promise<Task | null>;
  markTaskAsCompleted(id: number): Promise<Task | null>;
}

export default TaskService;
