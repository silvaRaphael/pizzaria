import { Router } from 'express';

import stateRoutes from './state-routes';
import cityRoutes from './city-routes';
import userRoutes from './user-routes';
import clientRoutes from './client-routes';
import pizzaFlavorRoutes from './pizza-flavor-routes';
import pizzaToppingRoutes from './pizza-topping-routes';
import orderRoutes from './order-routes';

const router = Router();

router.use(stateRoutes);
router.use(cityRoutes);
router.use(userRoutes);
router.use(clientRoutes);
router.use(pizzaFlavorRoutes);
router.use(pizzaToppingRoutes);
router.use(orderRoutes);

export default router;
