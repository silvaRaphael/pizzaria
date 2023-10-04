import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { PizzaToppingController } from '../controllers/pizza-topping-controller';
import { CreatePizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { GetPizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/get-pizza-topping-use-case';
import { GetAllPizzaToppingsUseCase } from '../../../application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';
import { UpdatePizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/update-pizza-topping-use-case';
import { DeletePizzaToppingUseCase } from '../../../application/use-cases/pizza-topping-use-cases/delete-pizza-topping-use-case';
import { PizzaToppingRepositoryImpl } from '../../database/repositories/pizza-topping-repository-impl';
import { AuthMiddleware } from '../middlewares/auth-middleware';

const router = Router();

const pizzaToppingRepository = new PizzaToppingRepositoryImpl();
const pizzaToppingController = new PizzaToppingController(
	new CreatePizzaToppingUseCase(pizzaToppingRepository),
	new GetPizzaToppingUseCase(pizzaToppingRepository),
	new GetAllPizzaToppingsUseCase(pizzaToppingRepository),
	new UpdatePizzaToppingUseCase(pizzaToppingRepository),
	new DeletePizzaToppingUseCase(pizzaToppingRepository),
);

router.post('/pizza-toppings', AuthMiddleware, (req, res) =>
	pizzaToppingController.createPizzaTopping(req, res),
);

router.get('/pizza-topping/:pizzaToppingId', AuthMiddleware, (req, res) =>
	pizzaToppingController.getPizzaTopping(req, res),
);

router.get('/pizza-toppings', (req, res) =>
	pizzaToppingController.getAllPizzaToppings(req, res),
);

router.put('/pizza-topping/:pizzaToppingId', AuthMiddleware, (req, res) =>
	pizzaToppingController.updatePizzaTopping(req, res),
);

router.delete('/pizza-topping/:pizzaToppingId', AuthMiddleware, (req, res) =>
	pizzaToppingController.deletePizzaTopping(req, res),
);

export default router;
