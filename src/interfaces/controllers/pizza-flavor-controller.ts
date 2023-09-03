import { Request, Response } from 'express';

import { CreatePizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { DeletePizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/delete-pizza-flavor-use-case';
import { GetAllPizzaFlavorsUseCase } from '../../application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { GetPizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/get-pizza-flavor-use-case';

export class PizzaFlavorController {
  constructor(
    private createPizzaFlavorUseCase: CreatePizzaFlavorUseCase,
    private getPizzaFlavorUseCase: GetPizzaFlavorUseCase,
    private getAllPizzaFlavorsUseCase: GetAllPizzaFlavorsUseCase,
    private deletePizzaFlavorUseCase: DeletePizzaFlavorUseCase,
  ) {}

  async createPizzaFlavor(req: Request, res: Response): Promise<void> {
    const { flavor, price } = req.body;

    try {
      const prizzaFlavor = await this.createPizzaFlavorUseCase.execute({
        flavor,
        price,
      });

      res.status(201).json({ id: prizzaFlavor.id });
    } catch (error: any) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getPizzaFlavor(req: Request, res: Response): Promise<void> {
    const { pizzaFlavorId } = req.params;

    try {
      const pizzaFlavor = await this.getPizzaFlavorUseCase.execute(
        pizzaFlavorId,
      );

      res.status(200).json(pizzaFlavor);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllPizzaFlavors(req: Request, res: Response): Promise<void> {
    try {
      const pizzaFlavors = await this.getAllPizzaFlavorsUseCase.execute();

      res.status(200).json(pizzaFlavors);
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async deletePizzaFlavor(req: Request, res: Response): Promise<void> {
    const { pizzaFlavorId } = req.params;

    try {
      await this.deletePizzaFlavorUseCase.execute(pizzaFlavorId);

      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
