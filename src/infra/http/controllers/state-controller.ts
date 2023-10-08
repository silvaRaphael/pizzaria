import { Request, Response } from 'express';

import { GetAllStatesUseCase } from '../../../application/use-cases/state-use-cases/get-all-states-use-case';

export class StateController {
	constructor(private getAllStatesUseCase: GetAllStatesUseCase) {}

	async getAllStates(req: Request, res: Response): Promise<void> {
		try {
			const states = await this.getAllStatesUseCase.execute();

			res.status(200).json(states);
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}
}
