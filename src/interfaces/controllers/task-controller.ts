import { Request, Response } from 'express';
import CreateTaskUseCase from '../../application/use-cases/task-use-cases/create-task-use-case';
import ListTasksUseCase from '../../application/use-cases/task-use-cases/list-tasks-use-case';

class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private listTasksUseCase: ListTasksUseCase,
  ) {}

  createTask(req: Request, res: Response): void {
    const { title } = req.body;

    try {
      this.createTaskUseCase.execute({ title });
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  listTasks(req: Request, res: Response): void {
    try {
      this.listTasksUseCase.execute();
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}

export default TaskController;
