import { Request, Response } from 'express';

import { CreatePizzaToppingUseCase } from '../../application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { DeletePizzaToppingUseCase } from '../../application/use-cases/pizza-topping-use-cases/delete-pizza-topping-use-case';
import { GetAllPizzaToppingsUseCase } from '../../application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';
import { GetPizzaToppingUseCase } from '../../application/use-cases/pizza-topping-use-cases/get-pizza-topping-use-case';

export class PizzaToppingController {
  constructor(
    private createPizzaToppingUseCase: CreatePizzaToppingUseCase,
    private getPizzaToppingUseCase: GetPizzaToppingUseCase,
    private getAllPizzaToppingsUseCase: GetAllPizzaToppingsUseCase,
    private deletePizzaToppingUseCase: DeletePizzaToppingUseCase,
  ) {}

  async createPizzaTopping(req: Request, res: Response): Promise<void> {
    const { topping, price } = req.body;

    try {
      const prizzaTopping = await this.createPizzaToppingUseCase.execute({
        topping,
        price,
      });

      res.status(201).json({ id: prizzaTopping.id });
    } catch (error: any) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getPizzaTopping(req: Request, res: Response): Promise<void> {
    const { pizzaToppingId } = req.params;

    try {
      const pizzaTopping = await this.getPizzaToppingUseCase.execute(
        pizzaToppingId,
      );

      res.status(200).json(pizzaTopping);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllPizzaToppings(req: Request, res: Response): Promise<void> {
    try {
      const pizzaToppings = await this.getAllPizzaToppingsUseCase.execute();

      res.status(200).json(pizzaToppings);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async deletePizzaTopping(req: Request, res: Response): Promise<void> {
    const { pizzaToppingId } = req.params;

    try {
      await this.deletePizzaToppingUseCase.execute(pizzaToppingId);

      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
