import { Router } from 'express';

import { pageContext } from '../../utils/page-context';
import { OrderRepositoryImpl } from '../../../database/repositories/order-repository-impl';
import { GetAllOrdersUseCase } from '../../../../application/use-cases/order-use-cases/get-all-orders-use-case';
import { WebAuthMiddleware } from '../../middlewares/web-auth-middleware';
import { ClientRepositoryImpl } from '../../../database/repositories/client-repository-impl';
import { GetAllClientsUseCase } from '../../../../application/use-cases/client-use-cases/get-all-clients-use-case';

const router = Router();

const orderRepository = new OrderRepositoryImpl();
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);

const clientRepository = new ClientRepositoryImpl();
const getAllClientsUseCase = new GetAllClientsUseCase(clientRepository);

router.get(
	'/',
	(req, res, next) => WebAuthMiddleware(req, res, next),
	async (req, res) => {
		if (req.query.s) {
			return res.render('home', {
				title: `Pesquisa - ${req.query.s}`,
				...pageContext(req, { url: undefined }),
			});
		}

		const todayOrders = await getAllOrdersUseCase.execute({
			created_at: new Date(),
		});

		const yesterdayOrders = await getAllOrdersUseCase.execute({
			created_at: new Date(new Date().setDate(new Date().getDate() - 1)),
		});

		const ordersPercentage =
			(todayOrders.length * 100) / yesterdayOrders.length - 100;

		const monthOrders = await getAllOrdersUseCase.execute({
			created_in: [
				new Date(new Date().setMonth(new Date().getMonth() - 1)),
				new Date(new Date().setMonth(new Date().getMonth())),
			],
		});

		// const lastMonthOrders = await getAllOrdersUseCase.execute({
		// 	created_in: [
		// 		new Date(new Date().setMonth(new Date().getMonth() - 1)),
		// 		new Date(new Date().setMonth(new Date().getMonth())),
		// 	],
		// });

		const clients = await getAllClientsUseCase.execute();

		const monthRevenueValue = monthOrders.reduce(
			(acc, crr) => acc + crr.price,
			0,
		);
		const lastMonthRevenueValue = monthOrders.reduce(
			(acc, crr) => acc + crr.price,
			0,
		);

		const monthRevenue = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(monthRevenueValue);

		const monthRevenuePercentage =
			(monthRevenueValue * 100) / lastMonthRevenueValue - 100;

		const clientsAmmount = clients.length;

		res.render('pages/home', {
			title: 'Pizzaria',
			...pageContext(req),
			ordersAmmount: todayOrders.length,
			ordersPercentage: Math.abs(ordersPercentage || 0),
			ordersIncrease: ordersPercentage >= 0,
			monthRevenue,
			monthRevenuePercentage,
			monthRevenueIncrease: monthRevenuePercentage >= 0,
			clientsAmmount,
		});
	},
);

export default router;
