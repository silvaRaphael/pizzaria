import { Request, Response } from 'express';
import fs from 'fs';

import { CreateOrderUseCase } from '../../../application/use-cases/order-use-cases/create-order-use-case';
import { GetOrderUseCase } from '../../../application/use-cases/order-use-cases/get-order-use-case';
import { GetAllOrdersUseCase } from '../../../application/use-cases/order-use-cases/get-all-orders-use-case';
import { GetAllClientOrdersUseCase } from '../../../application/use-cases/order-use-cases/get-all-client-orders-use-case';
import { GetOrderPizzasUseCase } from '../../../application/use-cases/order-use-cases/get-order-pizzas-use-case';
import { UpdateOrderStatusUseCase } from '../../../application/use-cases/order-use-cases/update-order-status-use-case';
import { UpdateOrderPizzasStatusUseCase } from '../../../application/use-cases/order-use-cases/update-order-pizzas-status-use-case';
import { DeleteOrderUseCase } from '../../../application/use-cases/order-use-cases/delete-order-use-case';
import { orderStatus } from '../../../domain/order-status';
import { FormatDate } from '../utils/format-date';
import { pizzaSizes } from '../../../domain/pizza-sizes';

export class OrderController {
	constructor(
		private createOrderUseCase: CreateOrderUseCase,
		private getOrderUseCase: GetOrderUseCase,
		private getAllOrdersUseCase: GetAllOrdersUseCase,
		private getAllClientOrdersUseCase: GetAllClientOrdersUseCase,
		private getOrderPizzasUseCase: GetOrderPizzasUseCase,
		private updateOrderStatusUseCase: UpdateOrderStatusUseCase,
		private updateOrderPizzasStatusUseCase: UpdateOrderPizzasStatusUseCase,
		private deleteOrderUseCase: DeleteOrderUseCase,
	) {}

	async createOrder(req: Request, res: Response): Promise<void> {
		const { client_id, price, orderPizzas } = req.body;

		try {
			const order = await this.createOrderUseCase.execute({
				client_id,
				price,
				orderPizzas,
			});

			res.status(201).json({ id: order.id });
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async getOrder(req: Request, res: Response): Promise<void> {
		const { orderId } = req.params;

		try {
			const order = await this.getOrderUseCase.execute(orderId);

			res.status(200).json(order);
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async getAllOrders(req: Request, res: Response): Promise<void> {
		try {
			const orders = await this.getAllOrdersUseCase.execute();

			let actionsButton = fs.readFileSync(
				'views/partials/delete-dropdown.hbs',
				'utf8',
			);

			const response = orders.map((item, index) => {
				let actions = actionsButton;
				actions = actions.replace('{{delete}}', `deleteOrder('${item.id}')`);

				if (item.status != 0) actions = '<i class="bi bi-clock"></i>';
				if (item.done) actions = '<i class="bi bi-check"></i>';

				return {
					...item,
					status: orderStatus.map((status) => {
						const notDone = !item.done
							? `style="cursor: pointer;" onclick="editOrderStatus('${item.id}', ${status.status})"`
							: '';
						return `<span class="badge ${status.color}" ${notDone}>${status.label}</span>`;
					})[item.status],
					price: new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(item.price),
					ammount: (item as any).orderPizza.reduce(
						(acc: number, crr: { ammount: string }) => acc + crr.ammount,
						0,
					),
					order: `<span class="badge bg-secondary" style="cursor: pointer;" onclick="getOrderPizzas('${item.id}')">Ver Pedido</span>`,
					updated_at: new FormatDate(item.updated_at).fullFormat(),
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

	async getAllClientOrders(req: Request, res: Response): Promise<void> {
		const { clientId } = req.params;

		try {
			const orders = await this.getAllClientOrdersUseCase.execute(clientId);

			let actionsButton = fs.readFileSync(
				'views/partials/delete-dropdown.hbs',
				'utf8',
			);

			const response = orders.map((item, index) => {
				let actions = actionsButton;
				actions = actions.replace('{{delete}}', `deleteOrder('${item.id}')`);

				if (item.status != 0) actions = '<i class="bi bi-clock"></i>';
				if (item.done) actions = '<i class="bi bi-check"></i>';

				return {
					...item,
					status: orderStatus.map((status) => {
						const notDone = !item.done
							? `style="cursor: pointer;" onclick="editOrderStatus('${item.id}', ${status.status})"`
							: '';
						return `<span class="badge ${status.color}" ${notDone}>${status.label}</span>`;
					})[item.status],
					price: new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(item.price),
					ammount: (item as any).orderPizza.reduce(
						(acc: number, crr: { ammount: string }) => acc + crr.ammount,
						0,
					),
					order: `<span class="badge bg-secondary" style="cursor: pointer;" onclick="getOrderPizzas('${item.id}')">Ver Pedido</span>`,
					updated_at: new FormatDate(item.updated_at).fullFormat(),
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

	async getOrderPizzas(req: Request, res: Response): Promise<void> {
		const { orderId } = req.params;

		try {
			const orderPizzas = await this.getOrderPizzasUseCase.execute(orderId);

			const response = orderPizzas.map((item, index) => {
				return {
					...item,
					price: new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}).format(item.price),
					size: pizzaSizes[item.size],
					updated_at: new FormatDate(item.updated_at).fullFormat(),
					'#': index + 1,
					actions: '',
				};
			});

			res.status(200).json(response);
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async updateOrderStatus(req: Request, res: Response): Promise<void> {
		const { orderId } = req.params;
		const { status } = req.body;

		try {
			await this.updateOrderStatusUseCase.execute({
				id: orderId,
				status,
			});

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async updateOrderPizzasStatus(req: Request, res: Response): Promise<void> {
		const { orderPizzasId } = req.params;
		const { status } = req.body;

		try {
			await this.updateOrderPizzasStatusUseCase.execute({
				id: orderPizzasId,
				status,
			});

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async deleteOrder(req: Request, res: Response): Promise<void> {
		const { orderId } = req.params;

		try {
			await this.deleteOrderUseCase.execute(orderId);

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}
}
