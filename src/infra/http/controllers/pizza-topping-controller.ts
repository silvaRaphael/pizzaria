import { Request, Response } from 'express';
import fs from 'fs';

import { CreatePizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { GetPizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/get-pizza-topping-use-case';
import { GetAllPizzaToppingsUseCase } from '../../../application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';
import { UpdatePizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/update-pizza-topping-use-case';
import { DeletePizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/delete-pizza-topping-use-case';

export class PizzaToppingController {
	constructor(
		private createPizzaToppingUseCase: CreatePizzaToppingUseCase,
		private getPizzaToppingUseCase: GetPizzaToppingUseCase,
		private getAllPizzaToppingsUseCase: GetAllPizzaToppingsUseCase,
		private updatePizzaToppingUseCase: UpdatePizzaToppingUseCase,
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
			// console.error(error);
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
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async getAllPizzaToppings(req: Request, res: Response): Promise<void> {
		try {
			const pizzaToppings = await this.getAllPizzaToppingsUseCase.execute();

			let actionsButton = fs.readFileSync(
				'views/partials/actions-dropdown.hbs',
				'utf8',
			);

			const response = pizzaToppings.map((item, index) => {
				let actions = actionsButton;
				actions = actions.replace('{{edit}}', `editTopping('${item.id}')`);
				actions = actions.replace('{{delete}}', `deleteTopping('${item.id}')`);

				return {
					...item,
					price: new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(item.price),
					'#': index + 1,
					actions,
				};
			});

			res.status(200).json(response);
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async updatePizzaTopping(req: Request, res: Response): Promise<void> {
		const { pizzaToppingId } = req.params;
		const { topping, price } = req.body;

		try {
			await this.updatePizzaToppingUseCase.execute({
				id: pizzaToppingId,
				topping,
				price,
			});

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async deletePizzaTopping(req: Request, res: Response): Promise<void> {
		const { pizzaToppingId } = req.params;

		try {
			await this.deletePizzaToppingUseCase.execute(pizzaToppingId);

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}
}
