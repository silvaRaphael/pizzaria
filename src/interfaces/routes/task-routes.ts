import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import TaskController from '../controllers/task-controller';
import CreateTaskUseCase from '../../application/use-cases/task-use-cases/create-task-use-case';
import TaskRepositoryImpl from '../../infrastructure/repositories/task-repository-impl';
import ListTasksUseCase from '../../application/use-cases/task-use-cases/list-tasks-use-case';

const router = Router();

const prismaClient = new PrismaClient();
const taskRepositoryImpl = new TaskRepositoryImpl(prismaClient);
const taskController = new TaskController(
  new CreateTaskUseCase(taskRepositoryImpl),
  new ListTasksUseCase(taskRepositoryImpl),
);

router.post('/tasks', (req, res) => {
  taskController.createTask(req, res);
});

router.get('/tasks', (req, res) => {
  taskController.createTask(req, res);
});

export default router;
