import { Router } from 'express';

import { UserRepositoryImpl } from '../../database/repositories/user-repository-impl';
import { UserController } from '../controllers/user-controller';
import { CreateUserUseCase } from '../../../application/use-cases/user-use-cases/create-user-use-case';
import { GetUserUseCase } from '../../../application/use-cases/user-use-cases/get-user-use-case';
import { GetAllUsersUseCase } from '../../../application/use-cases/user-use-cases/get-all-users-use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/user-use-cases/update-user-use-case';
import { DeleteUserUseCase } from '../../../application/use-cases/user-use-cases/delete-user-use-case';

const router = Router();

const userRepository = new UserRepositoryImpl();
const userController = new UserController(
  new CreateUserUseCase(userRepository),
  new GetUserUseCase(userRepository),
  new GetAllUsersUseCase(userRepository),
  new UpdateUserUseCase(userRepository),
  new DeleteUserUseCase(userRepository),
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

router.put('/user/:userId', (req, res) => {
  userController.updateUser(req, res);
});

router.delete('/user/:userId', (req, res) => {
  userController.deleteUser(req, res);
});

export default router;
