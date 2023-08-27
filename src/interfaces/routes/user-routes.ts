import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { UserRepositoryImpl } from '../../infrastructure/repositories/user-repository-impl';
import { UserController } from '../controllers/user-controller';
import { CreateUserUseCase } from '../../application/use-cases/user-use-cases/create-user-use-case';
import { ListUsersUseCase } from '../../application/use-cases/user-use-cases/list-users-use-case';
import { GetUserUseCase } from '../../application/use-cases/user-use-cases/get-user-use-case';

const router = Router();

const prismaClient = new PrismaClient();
const userRepositoryImpl = new UserRepositoryImpl(prismaClient);
const userController = new UserController(
  new CreateUserUseCase(userRepositoryImpl),
  new GetUserUseCase(userRepositoryImpl),
  new ListUsersUseCase(userRepositoryImpl),
);

router.post('/users', (req, res) => {
  userController.createTask(req, res);
});

router.get('/user/:userId', (req, res) => {
  userController.getUser(req, res);
});

router.get('/users', (req, res) => {
  userController.listUsers(req, res);
});

export default router;
