import { Request, Response } from 'express';

import { CreateUserUseCase } from '../../application/use-cases/user-use-cases/create-user-use-case';
import { GetUserUseCase } from '../../application/use-cases/user-use-cases/get-user-use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/user-use-cases/get-all-users-use-case';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  async createTask(req: Request, res: Response): Promise<void> {
    const { username, name, password } = req.body;

    try {
      const user = await this.createUserUseCase.execute({
        username,
        name,
        password,
      });
      res
        .status(201)
        .json({ message: 'Usuário criado com sucesso!', id: user.id });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro.' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    try {
      const user = await this.getUserUseCase.execute(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro.' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro.' });
    }
  }
}
