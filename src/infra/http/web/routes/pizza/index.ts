import { Router } from 'express';

import pizzaFlavorRoutes from './pizza-flavor-routes';
import pizzaToppingRoutes from './pizza-topping-routes';

const router = Router();

router.use('/pizza', pizzaFlavorRoutes);
router.use('/pizza', pizzaToppingRoutes);

export default router;
