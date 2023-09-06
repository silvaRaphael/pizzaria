import { Request, Response } from 'express';
import fs from 'node:fs';

import { CreatePizzaFlavorUseCase } from '../../../application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { GetPizzaFlavorUseCase } from '../../../application/use-cases/pizza-flavor-use-cases/get-pizza-flavor-use-case';
import { GetAllPizzaFlavorsUseCase } from '../../../application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { UpdatePizzaFlavorUseCase } from '../../../application/use-cases/pizza-flavor-use-cases/update-pizza-flavor-use-case';
import { DeletePizzaFlavorUseCase } from '../../../application/use-cases/pizza-flavor-use-cases/delete-pizza-flavor-use-case';

export class PizzaFlavorController {
  constructor(
    private createPizzaFlavorUseCase: CreatePizzaFlavorUseCase,
    private getPizzaFlavorUseCase: GetPizzaFlavorUseCase,
    private getAllPizzaFlavorsUseCase: GetAllPizzaFlavorsUseCase,
    private updatePizzaFlavorUseCase: UpdatePizzaFlavorUseCase,
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
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getPizzaFlavor(req: Request, res: Response): Promise<void> {
    const { pizzaFlavorId } = req.params;

    try {
      const pizzaFlavor = await this.getPizzaFlavorUseCase.execute(
        pizzaFlavorId,
      );

      const response = {
        ...pizzaFlavor,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
          .format(pizzaFlavor.price)
          .replace('R$ ', ''),
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      console.log(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllPizzaFlavors(req: Request, res: Response): Promise<void> {
    try {
      const pizzaFlavors = await this.getAllPizzaFlavorsUseCase.execute();

      let actions = fs.readFileSync(
        'views/partials/actions-dropdown.hbs',
        'utf8',
      );

      const response = pizzaFlavors.map((item, index) => {
        actions = actions.replace('{{edit}}', `editFlavor('${item.id}')`);
        actions = actions.replace('{{delete}}', `deleteFlavor('${item.id}')`);

        return {
          ...item,
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(item.price),
          '#': index + 1,
          '@': actions,
        };
      });

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async updatePizzaFlavor(req: Request, res: Response): Promise<void> {
    const { pizzaFlavorId } = req.params;
    const { flavor, price } = req.body;

    try {
      await this.updatePizzaFlavorUseCase.execute({
        id: pizzaFlavorId,
        flavor,
        price,
      });

      res.status(200).end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async deletePizzaFlavor(req: Request, res: Response): Promise<void> {
    const { pizzaFlavorId } = req.params;

    try {
      await this.deletePizzaFlavorUseCase.execute(pizzaFlavorId);

      res.status(200).end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
