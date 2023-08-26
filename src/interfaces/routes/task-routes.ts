import { Router } from 'express';

import TaskController from '../controllers/task-controller';
import CreateTaskUseCase from '../../application/use-cases/task-use-cases/create-task-use-case';
import TaskRepositoryImpl from '../../infrastructure/repositories/task-repository-impl';

const router = Router();

const taskController = new TaskController(
  new CreateTaskUseCase(new TaskRepositoryImpl()),
);

router.post('/tasks', (req, res) => {
  taskController.createTask(req, res);
});

export default router;
