import { Router } from 'express';

import pizzaFlavorRoutes from './pizza-flavor-routes';

const router = Router();

router.use('/pizza', pizzaFlavorRoutes);

export default router;
