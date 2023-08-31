import { Router } from 'express';

import userRoutes from './user-routes';
import clientRoutes from './client-routes';

const router = Router();

router.use(userRoutes);
router.use(clientRoutes);

export default router;
