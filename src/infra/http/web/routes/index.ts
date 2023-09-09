import { Router } from 'express';

import homeRoutes from './home-routes';
import pizzaRoutes from './pizza';
import clientRoutes from './client-routes';

const router = Router();

router.use(homeRoutes);
router.use(pizzaRoutes);
router.use(clientRoutes);

export default router;
