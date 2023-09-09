import { Router } from 'express';

import userRoutes from './user-routes';
import clientRoutes from './client-routes';
import pizzaFlavor from './pizza-flavor-routes';
import pizzaTopping from './pizza-topping-routes';
import stateRoutes from './state-routes';
import cityRoutes from './city-routes';

const router = Router();

router.use(userRoutes);
router.use(clientRoutes);
router.use(pizzaFlavor);
router.use(pizzaTopping);
router.use(stateRoutes);
router.use(cityRoutes);

export default router;
