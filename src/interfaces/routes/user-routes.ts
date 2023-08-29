import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { UserRepositoryImpl } from '../../infrastructure/repositories/user-repository-impl';
import { UserController } from '../controllers/user-controller';
import { CreateUserUseCase } from '../../application/use-cases/user-use-cases/create-user-use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/user-use-cases/get-all-users-use-case';
import { GetUserUseCase } from '../../application/use-cases/user-use-cases/get-user-use-case';

const router = Router();

const prismaClient = new PrismaClient();
const userRepositoryImpl = new UserRepositoryImpl(prismaClient);
const userController = new UserController(
  new CreateUserUseCase(userRepositoryImpl),
  new GetUserUseCase(userRepositoryImpl),
  new GetAllUsersUseCase(userRepositoryImpl),
);

router.post('/users', (req, res) => {
  userController.createUser(req, res);
});

router.get('/user/:userId', (req, res) => {
  userController.getUser(req, res);
});

router.get('/users', (req, res) => {
  userController.getAllUsers(req, res);
});

export default router;
