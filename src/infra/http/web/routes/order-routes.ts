import { Router } from 'express';

import { pageContext } from '../../utils/page-context';
import { PizzaFlavorRepositoryImpl } from '../../../database/repositories/pizza-flavor-repository-impl';
import { GetAllPizzaFlavorsUseCase } from '../../../../application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { PizzaToppingRepositoryImpl } from '../../../database/repositories/pizza-topping-repository-impl';
import { GetAllPizzaToppingsUseCase } from '../../../../application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';
import { WebAuthMiddleware } from '../../middlewares/web-auth-middleware';
import { orderStatus } from '../../../../domain/order-status';
import { pizzaSizes } from '../../../../domain/pizza-sizes';

const router = Router();

const pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
const getAllPizzaFlavorsUseCase = new GetAllPizzaFlavorsUseCase(
	pizzaFlavorRepository,
);

const pizzaToppingRepository = new PizzaToppingRepositoryImpl();
const getAllPizzaToppingsUseCase = new GetAllPizzaToppingsUseCase(
	pizzaToppingRepository,
);

router.get(
	'/pedidos',
	(req, res, next) => WebAuthMiddleware(req, res, next),
	async (req, res) => {
		const [pizzaFlavors, pizzaToppings] = await Promise.all([
			getAllPizzaFlavorsUseCase.execute(),
			getAllPizzaToppingsUseCase.execute(),
		]);

		res.render('pages/order/order', {
			title: 'Pedidos',
			...pageContext(req),
			pizzaFlavors,
			pizzaToppings,
			pizzaSizes,
			orderStatus,
		});
	},
);

export default router;
