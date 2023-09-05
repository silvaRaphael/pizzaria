import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

import { PizzaFlavorRepositoryImpl } from '../../infrastructure/repositories/pizza-flavor-repository-impl';
import { PizzaFlavorController } from '../controllers/pizza-flavor-controller';
import { CreatePizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/create-pizza-flavor-use-case';
import { GetPizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/get-pizza-flavor-use-case';
import { GetAllPizzaFlavorsUseCase } from '../../application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { UpdatePizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/update-pizza-flavor-use-case';
import { DeletePizzaFlavorUseCase } from '../../application/use-cases/pizza-flavor-use-cases/delete-pizza-flavor-use-case';

const router = Router();

const prismaClient = new PrismaClient();
const pizzaFlavorRepository = new PizzaFlavorRepositoryImpl(prismaClient);
const pizzaFlavorController = new PizzaFlavorController(
  new CreatePizzaFlavorUseCase(pizzaFlavorRepository),
  new GetPizzaFlavorUseCase(pizzaFlavorRepository),
  new GetAllPizzaFlavorsUseCase(pizzaFlavorRepository),
  new UpdatePizzaFlavorUseCase(pizzaFlavorRepository),
  new DeletePizzaFlavorUseCase(pizzaFlavorRepository),
);

router.post('/pizza-flavors', (req, res) =>
  pizzaFlavorController.createPizzaFlavor(req, res),
);

router.get('/pizza-flavor/:pizzaFlavorId', (req, res) =>
  pizzaFlavorController.getPizzaFlavor(req, res),
);

router.get('/pizza-flavors', (req, res) =>
  pizzaFlavorController.getAllPizzaFlavors(req, res),
);

router.put('/pizza-flavor/:pizzaFlavorId', (req, res) =>
  pizzaFlavorController.updatePizzaFlavor(req, res),
);

router.delete('/pizza-flavor/:pizzaFlavorId', (req, res) =>
  pizzaFlavorController.deletePizzaFlavor(req, res),
);

export default router;
