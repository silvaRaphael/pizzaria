import { Request, Response } from 'express';
import fs from 'node:fs';

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
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getClient(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;

    try {
      const client = await this.getClientUseCase.execute(clientId);

      res.status(200).json(client);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async getAllClients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await this.getAllClientsUseCase.execute();

      let actions = fs.readFileSync(
        'views/partials/actions-dropdown.hbs',
        'utf8',
      );

      const response = clients.map((item, index) => {
        actions = actions.replace('{{edit}}', `editFlavor('${item.id}')`);
        actions = actions.replace('{{delete}}', `deleteFlavor('${item.id}')`);

        return {
          ...item,
          '#': index + 1,
          actions,
        };
      });

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error);
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
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }

  async deleteClient(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;

    try {
      await this.deleteClientUseCase.execute(clientId);

      res.status(204).end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
