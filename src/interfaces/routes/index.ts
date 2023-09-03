import { Router } from 'express';

import userRoutes from './user-routes';
import clientRoutes from './client-routes';
import pizzaFlavor from './pizza-flavor-routes';
import pizzaTopping from './pizza-topping-routes';

const router = Router();

router.use(userRoutes);
router.use(clientRoutes);
router.use(pizzaFlavor);
router.use(pizzaTopping);

export default router;
