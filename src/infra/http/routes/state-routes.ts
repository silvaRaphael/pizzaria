import { Router } from 'express';

import { StateRepositoryImpl } from '../../database/repositories/state-repository-impl';
import { StateController } from '../controllers/state-controller';
import { GetAllStatesUseCase } from '../../../application/use-cases/state-use-cases/get-all-states-use-case';

const router = Router();

const stateRepository = new StateRepositoryImpl();
const stateController = new StateController(
  new GetAllStatesUseCase(stateRepository),
);

router.get('/states', (req, res) => stateController.getAllStates(req, res));

export default router;
