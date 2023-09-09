import { Router } from 'express';

import { pageContext } from '../../utils/page-context';
import { StateRepositoryImpl } from '../../../database/repositories/state-repository-impl';
import { GetAllStatesUseCase } from '../../../../application/use-cases/state-use-cases/get-all-states-use-case';

const router = Router();

const stateRepository = new StateRepositoryImpl();
const getAllStatesUseCase = new GetAllStatesUseCase(stateRepository);

router.get('/clientes', async (req, res) => {
  const states = await getAllStatesUseCase.execute();

  res.render('client/client', {
    title: 'Cliente',
    ...pageContext(req),
    states,
  });
});

export default router;
