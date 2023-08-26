import { Request, Response } from 'express';
import CreateTaskUseCase from '../../application/use-cases/task-use-cases/create-task-use-case';

class TaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  createTask(req: Request, res: Response): void {
    const { title } = req.body;

    try {
      this.createTaskUseCase.execute(title);
      res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}

export default TaskController;
