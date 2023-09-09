import { Router } from 'express';

import { CityRepositoryImpl } from '../../database/repositories/city-repository-impl';
import { CityController } from '../controllers/city-controller';
import { GetAllCitiesUseCase } from '../../../application/use-cases/city-use-cases/get-all-cities-use-case';
import { GetAllStateCitiesUseCase } from '../../../application/use-cases/city-use-cases/get-all-state-cities-use-case';

const router = Router();

const cityRepository = new CityRepositoryImpl();
const cityController = new CityController(
  new GetAllCitiesUseCase(cityRepository),
  new GetAllStateCitiesUseCase(cityRepository),
);

router.get('/cities', (req, res) => cityController.getAllCities(req, res));

router.get('/cities/:stateId', (req, res) =>
  cityController.getAllStateCities(req, res),
);

export default router;
