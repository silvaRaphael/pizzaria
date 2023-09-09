import { Router } from 'express';

import { pageContext } from '../../utils/page-context';
import { StateRepositoryImpl } from '../../../database/repositories/state-repository-impl';
import { GetAllStatesUseCase } from '../../../../application/use-cases/state-use-cases/get-all-states-use-case';
import { ClientRepositoryImpl } from '../../../database/repositories/client-repository-impl';
import { GetClientUseCase } from '../../../../application/use-cases/client-use-cases/get-client-use-case';
import { PizzaFlavorRepositoryImpl } from '../../../database/repositories/pizza-flavor-repository-impl';
import { GetAllPizzaFlavorsUseCase } from '../../../../application/use-cases/pizza-flavor-use-cases/get-all-pizza-flavors-use-case';
import { PizzaToppingRepositoryImpl } from '../../../database/repositories/pizza-topping-repository-impl';
import { GetAllPizzaToppingsUseCase } from '../../../../application/use-cases/pizza-topping-use-cases/get-all-pizza-toppings-use-case';

const router = Router();

const stateRepository = new StateRepositoryImpl();
const getAllStatesUseCase = new GetAllStatesUseCase(stateRepository);

const clientRepository = new ClientRepositoryImpl();
const getClientUseCase = new GetClientUseCase(clientRepository);

const pizzaFlavorRepository = new PizzaFlavorRepositoryImpl();
const getAllPizzaFlavorsUseCase = new GetAllPizzaFlavorsUseCase(
  pizzaFlavorRepository,
);

const pizzaToppingRepository = new PizzaToppingRepositoryImpl();
const getAllPizzaToppingsUseCase = new GetAllPizzaToppingsUseCase(
  pizzaToppingRepository,
);

router.get('/clientes', async (req, res) => {
  const states = await getAllStatesUseCase.execute();

  res.render('pages/client/client', {
    title: 'Clientes',
    ...pageContext(req),
    states,
  });
});

router.get('/clientes/:clientId/pedidos', async (req, res) => {
  const { clientId } = req.params;

  const [{ name: clientName }, pizzaFlavors, pizzaToppings] = await Promise.all(
    [
      getClientUseCase.execute(clientId),
      getAllPizzaFlavorsUseCase.execute(),
      getAllPizzaToppingsUseCase.execute(),
    ],
  );

  res.render('pages/client/client-orders', {
    title: `Pedidos - ${clientName}`,
    ...pageContext(req),
    menu: [{ link: '/clientes', label: 'Clientes' }],
    clientId,
    pizzaFlavors,
    pizzaToppings,
  });
});

export default router;
