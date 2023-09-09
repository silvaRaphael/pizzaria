import { Request, Response } from 'express';

import { GetAllStateCitiesUseCase } from '../../../application/use-cases/city-use-cases/get-all-state-cities-use-case';
import { GetAllCitiesUseCase } from '../../../application/use-cases/city-use-cases/get-all-cities-use-case';

export class CityController {
  constructor(
    private getAllCitiesUseCase: GetAllCitiesUseCase,
    private getAllStateCitiesUseCase: GetAllStateCitiesUseCase,
  ) {}

  async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await this.getAllCitiesUseCase.execute();

      res.status(200).json(cities);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllStateCities(req: Request, res: Response): Promise<void> {
    const { stateId } = req.params;

    try {
      const cities = await this.getAllStateCitiesUseCase.execute(stateId);

      res.status(200).json(cities);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
