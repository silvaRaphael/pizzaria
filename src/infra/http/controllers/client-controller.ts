import { Request, Response } from 'express';

import { CreateClientUseCase } from '../../../application/use-cases/client-use-cases/create-client-use-case';
import { GetClientUseCase } from '../../../application/use-cases/client-use-cases/get-client-use-case';
import { GetAllClientsUseCase } from '../../../application/use-cases/client-use-cases/get-all-clients-use-case';

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientUseCase: GetClientUseCase,
    private getAllClientsUseCase: GetAllClientsUseCase,
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

      res.status(200).json(clients);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro!' });
    }
  }
}
