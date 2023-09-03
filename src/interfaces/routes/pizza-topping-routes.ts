import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { PizzaToppingRepositoryImpl } from '../../infrastructure/repositories/pizza-topping-repository-impl';
import { PizzaToppingController } from '../controllers/pizza-topping-controller';
import { CreatePizzaToppingUseCase } from '../../application/use-cases/pizza-topping-use-cases/create-pizza-topping-use-case';
import { GetPizzaToppingUseCase } from '../../application/use-cases/pizza-topping-use-cases/get-pizza-topping-use-case';
import { GetAllPizzaToppingsUseCase } from '../../application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';
import { DeletePizzaToppingUseCase } from '../../application/use-cases/pizza-topping-use-cases/delete-pizza-topping-use-case';

const router = Router();

const prismaClient = new PrismaClient();
const pizzaToppingRepository = new PizzaToppingRepositoryImpl(prismaClient);
const pizzaToppingController = new PizzaToppingController(
  new CreatePizzaToppingUseCase(pizzaToppingRepository),
  new GetPizzaToppingUseCase(pizzaToppingRepository),
  new GetAllPizzaToppingsUseCase(pizzaToppingRepository),
  new DeletePizzaToppingUseCase(pizzaToppingRepository),
);

router.post('/pizza-toppings', (req, res) =>
  pizzaToppingController.createPizzaTopping(req, res),
);

router.get('/pizza-topping/:pizzaToppingId', (req, res) =>
  pizzaToppingController.getPizzaTopping(req, res),
);

router.get('/pizza-toppings', (req, res) =>
  pizzaToppingController.getAllPizzaToppings(req, res),
);

router.delete('/pizza-topping', (req, res) =>
  pizzaToppingController.deletePizzaTopping(req, res),
);

export default router;
