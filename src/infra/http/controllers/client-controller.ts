import { Request, Response } from 'express';
import fs from 'fs';

import { CreateClientUseCase } from '../../../application/use-cases/client-use-cases/create-client-use-case';
import { GetClientUseCase } from '../../../application/use-cases/client-use-cases/get-client-use-case';
import { GetAllClientsUseCase } from '../../../application/use-cases/client-use-cases/get-all-clients-use-case';
import { UpdateClientUseCase } from '../../../application/use-cases/client-use-cases/update-client-use-case';
import { DeleteClientUseCase } from '../../../application/use-cases/client-use-cases/delete-client-use-case';

export class ClientController {
	constructor(
		private createClientUseCase: CreateClientUseCase,
		private getClientUseCase: GetClientUseCase,
		private getAllClientsUseCase: GetAllClientsUseCase,
		private updateClientUseCase: UpdateClientUseCase,
		private deleteClientUseCase: DeleteClientUseCase,
	) {}

	async createClient(req: Request, res: Response): Promise<void> {
		const {
			name,
			phone,
			zip_code,
			street_address,
			street_number,
			reference,
			state_id,
			city_id,
		} = req.body;

		try {
			const client = await this.createClientUseCase.execute({
				name,
				phone,
				zip_code,
				street_address,
				street_number,
				reference,
				state_id,
				city_id,
			});

			res.status(201).json({ id: client.id });
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async getClient(req: Request, res: Response): Promise<void> {
		const { clientId } = req.params;

		try {
			const client = await this.getClientUseCase.execute(clientId);

			res.status(200).json(client);
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async getAllClients(req: Request, res: Response): Promise<void> {
		try {
			const clients = await this.getAllClientsUseCase.execute();

			const actionsButton = fs.readFileSync(
				'views/partials/actions-dropdown.hbs',
				'utf8',
			);

			const response = clients.map((item, index) => {
				let actions = actionsButton;
				actions = actions.replace('{{edit}}', `editClient('${item.id}')`);
				actions = actions.replace('{{delete}}', `deleteClient('${item.id}')`);

				const orders = `<a class='badge bg-secondary text-white' href='/clientes/${item.id}/pedidos'>Ver Pedidos</a>`;

				return {
					...item,
					'#': index + 1,
					orders,
					actions,
				};
			});

			res.status(200).json(response);
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async updateClient(req: Request, res: Response): Promise<void> {
		const { clientId } = req.params;
		const {
			name,
			phone,
			zip_code,
			street_address,
			street_number,
			reference,
			state_id,
			city_id,
		} = req.body;

		try {
			await this.updateClientUseCase.execute({
				id: clientId,
				name,
				phone,
				zip_code,
				street_address,
				street_number,
				reference,
				state_id,
				city_id,
			});

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}

	async deleteClient(req: Request, res: Response): Promise<void> {
		const { clientId } = req.params;

		try {
			await this.deleteClientUseCase.execute(clientId);

			res.status(204).end();
		} catch (error: any) {
			// console.error(error);
			res.status(500).json({ error: 'Ocorreu um erro!' });
		}
	}
}
